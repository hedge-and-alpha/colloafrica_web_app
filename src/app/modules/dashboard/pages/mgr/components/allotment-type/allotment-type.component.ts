import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ca-allotment-type',
  templateUrl: './allotment-type.component.html',
  styleUrl: './allotment-type.component.css',
})
export class AllotmentTypeComponent implements OnInit {
  selectedPositionControl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(1),
  ]);

  allowableNumbers: number[] = [];

  @Input() numberOfMembers!: number;
  @Input() selectedPosition!: number;

  @Output() numberOfMembersChange = new EventEmitter<number>();

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.selectedPositionControl.patchValue(this.selectedPosition);
    this.allowableNumbers = Array.from(
      { length: this.numberOfMembers },
      (_, i) => i + 1
    );
  }

  handlePositionChange(event: number) {
    this.selectedPositionControl.patchValue(event);
  }

  handleTypeSelection(type: 'manual' | 'auto') {
    if (type === 'auto') {
      this.selectedPositionControl.reset();
    }
    this.modalService.close({
      position: this.selectedPositionControl.value,
      type,
    });
  }
}
