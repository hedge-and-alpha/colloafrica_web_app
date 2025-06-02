import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { MGR } from '../../../../../../interfaces/mgr.interface';

export interface PositionSlot {
  position: number;
  isAvailable: boolean;
  isSelected: boolean;
  isRecommended: boolean;
  occupant?: {
    name: string;
    initials: string;
    joinDate: Date;
    avatar?: string;
  };
  benefits?: string[];
}

@Component({
  selector: 'ca-position-selector',
  templateUrl: './position-selector.component.html',
  styleUrls: ['./position-selector.component.css']
})
export class PositionSelectorComponent implements OnInit, OnChanges {
  @Input() mgr!: MGR;
  @Input() selectedPosition: number | null = null;
  @Output() positionSelected = new EventEmitter<number | null>();
  @Output() recommendationRequested = new EventEmitter<void>();

  positions: PositionSlot[] = [];
  loading = false;
  showRecommendations = false;
  autoAssignMode = true;
  conflictResolution = false;
  conflictMessage = '';
  reservationTimeout: any;

  // User Guidance System
  showGuidance = false;
  guidanceStep = 0;
  isFirstTime = true;
  guidanceSteps = [
    {
      title: "Welcome to Position Selection",
      description: "Choose your position in this MGR plan. Your position determines when you'll receive your payout.",
      highlight: "position-selector",
      action: "Let's start!"
    },
    {
      title: "Auto-Assign (Recommended)", 
      description: "We recommend letting the system choose the best available position for you. This is perfect for first-time users.",
      highlight: "auto-assign",
      action: "I understand"
    },
    {
      title: "Manual Position Selection",
      description: "You can also choose a specific position. Each position has different benefits based on timing and risk.",
      highlight: "position-grid", 
      action: "Show me benefits"
    },
    {
      title: "Position Benefits",
      description: "Early positions (1-3) have lower risk but shorter savings period. Later positions build more discipline but wait longer for payout.",
      highlight: "benefits-guide",
      action: "Got it!"
    }
  ];

  constructor(private api: DashboardApiService) {}

  ngOnInit() {
    this.initializePositions();
    this.loadPositionData();
    this.checkIfFirstTime();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPosition'] && this.positions.length > 0) {
      this.updateSelectedPosition();
    }
  }

  initializePositions() {
    const totalSlots = this.mgr.total_slots || parseInt(this.mgr.number_of_members) || 10;
    this.positions = Array.from({ length: totalSlots }, (_, index) => ({
      position: index + 1,
      isAvailable: true,
      isSelected: false,
      isRecommended: false,
      benefits: this.getPositionBenefits(index + 1, totalSlots)
    }));
  }

  getPositionBenefits(position: number, totalSlots: number): string[] {
    const benefits: string[] = [];
    
    if (position === 1) {
      benefits.push('First to receive payout');
      benefits.push('Lower contribution risk');
    } else if (position === totalSlots) {
      benefits.push('Longer savings period');
      benefits.push('Maximum compound benefit');
    } else if (position <= Math.ceil(totalSlots / 3)) {
      benefits.push('Early payout position');
      benefits.push('Lower risk profile');
    } else if (position >= Math.floor((2 * totalSlots) / 3)) {
      benefits.push('Extended savings period');
      benefits.push('Higher savings discipline');
    } else {
      benefits.push('Balanced risk/reward');
      benefits.push('Mid-cycle flexibility');
    }

    return benefits;
  }

  loadPositionData() {
    this.loading = true;
    
    // Make API call to get real position data
    this.api.getPublicMgrPositions(this.mgr.id).subscribe({
      next: (response: any) => {
        this.updatePositionsFromAPI(response.data);
        this.generateRecommendations();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading position data:', error);
        // Fallback to simulation for development
        this.simulateOccupiedPositions();
        this.generateRecommendations();
        this.loading = false;
      }
    });
  }

  updatePositionsFromAPI(positionData: any) {
    if (positionData && positionData.positions) {
      positionData.positions.forEach((apiPosition: any) => {
        const position = this.positions.find(p => p.position === apiPosition.position);
        if (position) {
          position.isAvailable = apiPosition.is_available;
          if (!apiPosition.is_available && apiPosition.occupant) {
            position.occupant = {
              name: apiPosition.occupant.name,
              initials: this.getInitials(apiPosition.occupant.name),
              joinDate: new Date(apiPosition.occupant.joined_at),
              avatar: apiPosition.occupant.avatar
            };
          }
        }
      });
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  simulateOccupiedPositions() {
    // Simulate some positions being taken
    const occupiedPositions = [1, 3, 7]; // Example occupied positions
    
    occupiedPositions.forEach(pos => {
      const position = this.positions.find(p => p.position === pos);
      if (position) {
        position.isAvailable = false;
        position.occupant = {
          name: `User ${pos}`,
          initials: `U${pos}`,
          joinDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random date within last week
        };
      }
    });
  }

  generateRecommendations() {
    // Simple recommendation logic based on available positions and benefits
    const availablePositions = this.positions.filter(p => p.isAvailable);
    
    if (availablePositions.length > 0) {
      // Recommend position 2 if available (early but not first)
      let recommended = availablePositions.find(p => p.position === 2);
      
      // If position 2 is taken, recommend the earliest available position
      if (!recommended) {
        recommended = availablePositions[0];
      }
      
      if (recommended) {
        recommended.isRecommended = true;
      }
    }
  }

  selectPosition(position: PositionSlot) {
    if (!position.isAvailable) return;

    // Check for real-time availability before selection
    this.checkPositionAvailability(position.position).then((isStillAvailable) => {
      if (!isStillAvailable) {
        this.handlePositionConflict(position.position);
        return;
      }

      // Clear previous selection
      this.positions.forEach(p => p.isSelected = false);
      
      // Set new selection and create temporary reservation
      position.isSelected = true;
      this.autoAssignMode = false;
      this.createTemporaryReservation(position.position);
      
      this.positionSelected.emit(position.position);
    });
  }

  async checkPositionAvailability(position: number): Promise<boolean> {
    try {
      const response: any = await this.api.getPublicMgrPositions(this.mgr.id).toPromise();
      const positionData = response?.data?.positions?.find((p: any) => p.position === position);
      return positionData?.is_available || false;
    } catch (error) {
      console.warn('Could not verify position availability, proceeding with optimistic update');
      return true; // Optimistic approach if API fails
    }
  }

  createTemporaryReservation(position: number) {
    // Clear any existing reservation
    if (this.reservationTimeout) {
      clearTimeout(this.reservationTimeout);
    }

    // Create a 30-second temporary reservation
    this.reservationTimeout = setTimeout(() => {
      this.refreshPositionData();
    }, 30000);
  }

  handlePositionConflict(position: number) {
    this.conflictResolution = true;
    this.conflictMessage = `Position ${position} was just taken by another user. Please select a different position.`;
    
    // Refresh position data
    this.refreshPositionData();
    
    // Auto-clear conflict message after 5 seconds
    setTimeout(() => {
      this.conflictResolution = false;
      this.conflictMessage = '';
    }, 5000);
  }

  refreshPositionData() {
    this.loadPositionData();
  }

  resolveConflict() {
    this.conflictResolution = false;
    this.conflictMessage = '';
    
    // Suggest alternative positions
    this.suggestAlternativePositions();
  }

  suggestAlternativePositions() {
    const availablePositions = this.positions.filter(p => p.isAvailable);
    if (availablePositions.length > 0) {
      // Highlight alternative positions
      availablePositions.slice(0, 3).forEach(pos => {
        pos.isRecommended = true;
      });
      
      this.showRecommendations = true;
    }
  }

  selectAutoAssign() {
    this.positions.forEach(p => p.isSelected = false);
    this.autoAssignMode = true;
    this.positionSelected.emit(null);
  }

  toggleRecommendations() {
    this.showRecommendations = !this.showRecommendations;
    if (this.showRecommendations) {
      this.recommendationRequested.emit();
    }
  }

  updateSelectedPosition() {
    this.positions.forEach(p => {
      p.isSelected = p.position === this.selectedPosition;
    });
    this.autoAssignMode = this.selectedPosition === null;
  }

  getPositionClass(position: PositionSlot): string {
    const classes = ['position-slot'];
    
    if (!position.isAvailable) classes.push('occupied');
    else if (position.isSelected) classes.push('selected');
    else if (position.isRecommended && this.showRecommendations) classes.push('recommended');
    else classes.push('available');
    
    return classes.join(' ');
  }

  getPositionTooltip(position: PositionSlot): string {
    if (!position.isAvailable && position.occupant) {
      return `Position taken by ${position.occupant.name} on ${position.occupant.joinDate.toLocaleDateString()}`;
    }
    
    if (position.benefits && position.benefits.length > 0) {
      return position.benefits.join(', ');
    }
    
    return `Position ${position.position}`;
  }

  getSelectedPositionBenefits(): string {
    if (!this.selectedPosition) return '';
    const position = this.positions.find(p => p.position === this.selectedPosition);
    return position?.benefits?.join(', ') || '';
  }

  // User Guidance Methods
  startGuidance() {
    this.showGuidance = true;
    this.guidanceStep = 0;
  }

  nextGuidanceStep() {
    if (this.guidanceStep < this.guidanceSteps.length - 1) {
      this.guidanceStep++;
      
      // Trigger specific actions based on step
      this.handleGuidanceStepActions();
    } else {
      this.completeGuidance();
    }
  }

  previousGuidanceStep() {
    if (this.guidanceStep > 0) {
      this.guidanceStep--;
    }
  }

  handleGuidanceStepActions() {
    const currentStep = this.guidanceSteps[this.guidanceStep];
    
    switch (currentStep.highlight) {
      case 'benefits-guide':
        this.showRecommendations = true;
        break;
      case 'position-grid':
        this.highlightAvailablePositions();
        break;
    }
  }

  highlightAvailablePositions() {
    // Temporarily highlight available positions for demonstration
    this.positions.filter(p => p.isAvailable).forEach(pos => {
      pos.isRecommended = true;
    });
    
    // Remove highlights after 3 seconds
    setTimeout(() => {
      this.positions.forEach(pos => pos.isRecommended = false);
      this.generateRecommendations(); // Restore original recommendations
    }, 3000);
  }

  completeGuidance() {
    this.showGuidance = false;
    this.isFirstTime = false;
    this.guidanceStep = 0;
    
    // Store preference to not show guidance again
    localStorage.setItem('mgr_position_guidance_seen', 'true');
  }

  skipGuidance() {
    this.completeGuidance();
  }

  getCurrentGuidanceStep() {
    return this.guidanceSteps[this.guidanceStep];
  }

  checkIfFirstTime() {
    const hasSeenGuidance = localStorage.getItem('mgr_position_guidance_seen');
    this.isFirstTime = !hasSeenGuidance;
    
    if (this.isFirstTime) {
      // Auto-start guidance after a short delay
      setTimeout(() => {
        this.startGuidance();
      }, 1000);
    }
  }
} 