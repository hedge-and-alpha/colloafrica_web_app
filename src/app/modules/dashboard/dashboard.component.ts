import { Component, isDevMode } from '@angular/core';
import { ModalService } from '../../components/modal/modal.service';
import { NetworkService } from '../../services/network.service';
import { UserStoreService } from '../../stores+/user.store';
import { AlertService } from '../../components/alert/alert.service';

@Component({
  selector: 'ca-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  online = true;
  isBvnVerified = false;

  constructor(
    private networkService: NetworkService,
    private modalService: ModalService,
    private userStore: UserStoreService,
    private alert: AlertService
  ) {
    // this.networkService.isOnline$.subscribe((v) => {
    //   this.online = v;
    // });
    // this.networkService.isOffline$.subscribe((v) => {
    //   this.online = v;
    // });
  }

  ngOnInit() {
    this.isBvnVerified =
      this.userStore.user?.bvn_verification_status === 1 ? true : false;

    async function loadBvn() {
      return (await import('./components/verify-bvn/verify-bvn.component'))
        .VerifyBvnComponent;
    }

    if (!this.isBvnVerified) {
      loadBvn().then((bvnComponent) => {
        this.modalService.open(bvnComponent, 'regular', {
          showHeading: false,
        });
      });

      this.alert.open(
        'warning',
        {
          summary: 'Complete KYC',
          details: 'Please verify your BVN in order to receive payouts.',
        },
        90000000
      );
    }
  }

  checkOnlineStatus() {
    console.log('checking online status...');
    this.online = true;
    console.log('[online]:', this.online);
  }

  checkOfflineStatus() {
    console.log('checking offline status...');
    this.online = false;
    console.log('[online]:', this.online);
  }

  // ngOnDestroy() {
  //   window.removeEventListener('offline', this.checkOfflineStatus);
  //   window.removeEventListener('online', this.checkOnlineStatus);
  // }
}
