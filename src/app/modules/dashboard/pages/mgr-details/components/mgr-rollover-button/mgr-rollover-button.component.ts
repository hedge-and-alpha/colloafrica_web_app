import { Component, Input, signal } from '@angular/core';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { AlertService } from '../../../../../../components/alert/alert.service';
import { MGR } from '../../../../../../interfaces/mgr.interface';

@Component({
  selector: 'ca-mgr-rollover-button',
  templateUrl: './mgr-rollover-button.component.html',
  styleUrls: ['./mgr-rollover-button.component.css']
})
export class MgrRolloverButtonComponent {
  @Input() plan!: MGR;
  isLoading = signal(false);

  constructor(
    private dashboardApi: DashboardApiService,
    private alert: AlertService
  ) {}

  showRolloverButton() {
    // Only show button if the MGR is in a state where rollover is possible
    return this.plan.status === 'completed' || this.plan.status === 'active';
  }

  async onRolloverClick() {
    if (!this.plan) return;

    const confirmed = window.confirm('Are you sure you want to continue with the next cycle of this MGR? This action cannot be undone.');

    if (!confirmed) return;

    this.isLoading.set(true);

    try {
      await this.dashboardApi.initiateMgrRollover(this.plan.id).toPromise();
      this.alert.open('success', {
        summary: 'Success',
        details: 'You have successfully opted in for the next cycle. The MGR will be recreated with all participating members.',
        closable: true
      });
      // Optional: Refresh the page or update the UI as needed
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Rollover failed:', error);
      this.alert.open('danger', {
        summary: 'Error',
        details: 'Failed to process rollover. Please try again later.',
        closable: true
      });
    } finally {
      this.isLoading.set(false);
    }
  }
}
