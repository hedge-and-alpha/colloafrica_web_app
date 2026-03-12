import { Component, OnInit } from '@angular/core';
import { AdminSettingsService, PlatformSettings, SystemStatus, PaymentGateway, SystemAdmin, SystemLog } from '../../../../services/api/admin-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // Main data
  platformSettings: PlatformSettings | null = null;
  systemStatus: SystemStatus | null = null;
  paymentGateways: PaymentGateway[] = [];
  systemAdmins: SystemAdmin[] = [];
  systemLogs: SystemLog[] = [];

  // Loading states
  loading = false;
  statusLoading = false;
  gatewaysLoading = false;
  adminsLoading = false;
  logsLoading = false;

  // Active sections
  activeSection = 'overview';
  activeSettingsTab = 'general';

  // Modal states
  showGatewayModal = false;
  showAdminModal = false;
  showConfirmModal = false;

  // Form data
  selectedGateway: PaymentGateway | null = null;
  selectedAdmin: SystemAdmin | null = null;
  newAdmin = {
    username: '',
    email: '',
    fullName: '',
    role: 'admin' as 'super_admin' | 'admin' | 'moderator' | 'support',
    permissions: [] as string[]
  };

  // Available permissions
  availablePermissions = [
    { value: 'users.*', label: 'User Management' },
    { value: 'mgrs.*', label: 'MGR Management' },
    { value: 'transactions.*', label: 'Transaction Management' },
    { value: 'analytics.*', label: 'Analytics Access' },
    { value: 'reports.*', label: 'Reports Generation' },
    { value: 'settings.*', label: 'Settings Management' },
    { value: 'admins.*', label: 'Admin Management' },
    { value: 'system.*', label: 'System Operations' }
  ];

  // Section options
  sections = [
    { id: 'overview', label: 'System Overview', icon: 'dashboard' },
    { id: 'general', label: 'Platform Settings', icon: 'settings' },
    { id: 'gateways', label: 'Payment Gateways', icon: 'payment' },
    { id: 'admins', label: 'Admin Users', icon: 'users' },
    { id: 'logs', label: 'System Logs', icon: 'logs' },
    { id: 'maintenance', label: 'Maintenance', icon: 'tools' }
  ];

  // Settings tabs
  settingsTabs = [
    { id: 'general', label: 'General' },
    { id: 'business', label: 'Business Rules' },
    { id: 'security', label: 'Security' },
    { id: 'features', label: 'Features' },
    { id: 'notifications', label: 'Notifications' }
  ];

  // Confirmation modal data
  confirmAction: any = null;

  constructor(private adminSettingsService: AdminSettingsService) {}

  ngOnInit() {
    this.loadSystemStatus();
    this.loadPlatformSettings();
  }

  // Navigation
  setActiveSection(section: string) {
    this.activeSection = section;
    
    switch (section) {
      case 'gateways':
        this.loadPaymentGateways();
        break;
      case 'admins':
        this.loadSystemAdmins();
        break;
      case 'logs':
        this.loadSystemLogs();
        break;
    }
  }

  setActiveSettingsTab(tab: string) {
    this.activeSettingsTab = tab;
  }

  // Data loading methods
  loadSystemStatus() {
    this.statusLoading = true;
    this.adminSettingsService.getSystemStatus().subscribe(
      (status) => {
        this.systemStatus = status;
        this.statusLoading = false;
      },
      (error) => {
        console.error('Error loading system status:', error);
        this.statusLoading = false;
      }
    );
  }

  loadPlatformSettings() {
    this.loading = true;
    this.adminSettingsService.getPlatformSettings().subscribe(
      (settings) => {
        this.platformSettings = settings;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading platform settings:', error);
        this.loading = false;
      }
    );
  }

  loadPaymentGateways() {
    this.gatewaysLoading = true;
    this.adminSettingsService.getPaymentGateways().subscribe(
      (gateways) => {
        this.paymentGateways = gateways;
        this.gatewaysLoading = false;
      },
      (error) => {
        console.error('Error loading payment gateways:', error);
        this.gatewaysLoading = false;
      }
    );
  }

  loadSystemAdmins() {
    this.adminsLoading = true;
    this.adminSettingsService.getSystemAdmins().subscribe(
      (admins) => {
        this.systemAdmins = admins;
        this.adminsLoading = false;
      },
      (error) => {
        console.error('Error loading system admins:', error);
        this.adminsLoading = false;
      }
    );
  }

  loadSystemLogs() {
    this.logsLoading = true;
    this.adminSettingsService.getSystemLogs().subscribe(
      (logs) => {
        this.systemLogs = logs;
        this.logsLoading = false;
      },
      (error) => {
        console.error('Error loading system logs:', error);
        this.logsLoading = false;
      }
    );
  }

  // Settings management
  savePlatformSettings() {
    if (!this.platformSettings) return;

    this.loading = true;
    this.adminSettingsService.updatePlatformSettings(this.platformSettings).subscribe(
      (response) => {
        console.log('Settings saved successfully:', response);
        this.loading = false;
        alert('Settings saved successfully!');
      },
      (error) => {
        console.error('Error saving settings:', error);
        this.loading = false;
        alert('Error saving settings. Please try again.');
      }
    );
  }

  // Payment Gateway management
  openGatewayModal(gateway?: PaymentGateway) {
    this.selectedGateway = gateway ? { ...gateway } : null;
    this.showGatewayModal = true;
  }

  closeGatewayModal() {
    this.showGatewayModal = false;
    this.selectedGateway = null;
  }

  saveGateway() {
    if (!this.selectedGateway) return;

    this.adminSettingsService.updatePaymentGateway(this.selectedGateway.id, this.selectedGateway).subscribe(
      (response) => {
        console.log('Gateway updated:', response);
        this.loadPaymentGateways();
        this.closeGatewayModal();
        alert('Payment gateway updated successfully!');
      },
      (error) => {
        console.error('Error updating gateway:', error);
        alert('Error updating gateway. Please try again.');
      }
    );
  }

  testGateway(gatewayId: string) {
    this.adminSettingsService.testPaymentGateway(gatewayId).subscribe(
      (response) => {
        console.log('Gateway test result:', response);
        alert(`Gateway test successful! Response time: ${response.responseTime}ms`);
      },
      (error) => {
        console.error('Gateway test failed:', error);
        alert('Gateway test failed. Please check configuration.');
      }
    );
  }

  // Admin management
  openAdminModal(admin?: SystemAdmin) {
    if (admin) {
      this.selectedAdmin = { ...admin };
      this.newAdmin = {
        username: admin.username,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role,
        permissions: [...admin.permissions]
      };
    } else {
      this.selectedAdmin = null;
      this.newAdmin = {
        username: '',
        email: '',
        fullName: '',
        role: 'admin',
        permissions: []
      };
    }
    this.showAdminModal = true;
  }

  closeAdminModal() {
    this.showAdminModal = false;
    this.selectedAdmin = null;
  }

  saveAdmin() {
    if (this.selectedAdmin) {
      // Update existing admin
      this.adminSettingsService.updateSystemAdmin(this.selectedAdmin.id, this.newAdmin).subscribe(
        (response) => {
          console.log('Admin updated:', response);
          this.loadSystemAdmins();
          this.closeAdminModal();
          alert('Admin user updated successfully!');
        },
        (error) => {
          console.error('Error updating admin:', error);
          alert('Error updating admin. Please try again.');
        }
      );
    } else {
      // Create new admin
      this.adminSettingsService.createSystemAdmin(this.newAdmin).subscribe(
        (response) => {
          console.log('Admin created:', response);
          this.loadSystemAdmins();
          this.closeAdminModal();
          alert('Admin user created successfully!');
        },
        (error) => {
          console.error('Error creating admin:', error);
          alert('Error creating admin. Please try again.');
        }
      );
    }
  }

  confirmDeleteAdmin(admin: SystemAdmin) {
    this.confirmAction = {
      title: 'Delete Admin User',
      message: `Are you sure you want to delete admin user "${admin.fullName}"? This action cannot be undone.`,
      action: () => this.deleteAdmin(admin.id)
    };
    this.showConfirmModal = true;
  }

  deleteAdmin(adminId: number) {
    this.adminSettingsService.deleteSystemAdmin(adminId).subscribe(
      (response) => {
        console.log('Admin deleted:', response);
        this.loadSystemAdmins();
        this.closeConfirmModal();
        alert('Admin user deleted successfully!');
      },
      (error) => {
        console.error('Error deleting admin:', error);
        alert('Error deleting admin. Please try again.');
      }
    );
  }

  // Permission management
  togglePermission(permission: string) {
    const index = this.newAdmin.permissions.indexOf(permission);
    if (index > -1) {
      this.newAdmin.permissions.splice(index, 1);
    } else {
      this.newAdmin.permissions.push(permission);
    }
  }

  hasPermission(permission: string): boolean {
    return this.newAdmin.permissions.includes(permission);
  }

  // Maintenance operations
  clearCache() {
    this.confirmAction = {
      title: 'Clear System Cache',
      message: 'Are you sure you want to clear the system cache? This may temporarily slow down the platform.',
      action: () => this.executeClearCache()
    };
    this.showConfirmModal = true;
  }

  executeClearCache() {
    this.adminSettingsService.clearCache().subscribe(
      (response) => {
        console.log('Cache cleared:', response);
        this.closeConfirmModal();
        alert('System cache cleared successfully!');
      },
      (error) => {
        console.error('Error clearing cache:', error);
        alert('Error clearing cache. Please try again.');
      }
    );
  }

  optimizeDatabase() {
    this.confirmAction = {
      title: 'Optimize Database',
      message: 'Are you sure you want to optimize the database? This operation may take several minutes.',
      action: () => this.executeOptimizeDatabase()
    };
    this.showConfirmModal = true;
  }

  executeOptimizeDatabase() {
    this.adminSettingsService.optimizeDatabase().subscribe(
      (response) => {
        console.log('Database optimized:', response);
        this.closeConfirmModal();
        alert(`Database optimization completed! ${response.tablesOptimized} tables optimized, ${response.spaceRecovered} space recovered.`);
      },
      (error) => {
        console.error('Error optimizing database:', error);
        alert('Error optimizing database. Please try again.');
      }
    );
  }

  createBackup() {
    this.confirmAction = {
      title: 'Create Manual Backup',
      message: 'Are you sure you want to create a manual backup? This will create a full system backup.',
      action: () => this.executeCreateBackup()
    };
    this.showConfirmModal = true;
  }

  executeCreateBackup() {
    this.adminSettingsService.createBackup('manual').subscribe(
      (response) => {
        console.log('Backup created:', response);
        this.closeConfirmModal();
        alert(`Backup created successfully! Backup ID: ${response.backupId}`);
      },
      (error) => {
        console.error('Error creating backup:', error);
        alert('Error creating backup. Please try again.');
      }
    );
  }

  // Modal management
  closeConfirmModal() {
    this.showConfirmModal = false;
    this.confirmAction = null;
  }

  executeConfirmAction() {
    if (this.confirmAction && this.confirmAction.action) {
      this.confirmAction.action();
    }
  }

  // Utility methods
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'online':
      case 'healthy':
      case 'active':
      case 'completed':
        return 'status-success';
      case 'warning':
      case 'degraded':
      case 'running':
        return 'status-warning';
      case 'critical':
      case 'failed':
      case 'inactive':
        return 'status-danger';
      default:
        return 'status-default';
    }
  }

  getRoleClass(role: string): string {
    switch (role) {
      case 'super_admin': return 'role-super';
      case 'admin': return 'role-admin';
      case 'moderator': return 'role-moderator';
      case 'support': return 'role-support';
      default: return 'role-default';
    }
  }

  getLogLevelClass(level: string): string {
    switch (level) {
      case 'info': return 'log-info';
      case 'warning': return 'log-warning';
      case 'error': return 'log-error';
      case 'critical': return 'log-critical';
      default: return 'log-default';
    }
  }
} 