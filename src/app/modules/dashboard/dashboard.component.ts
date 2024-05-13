import { Component, computed, signal } from '@angular/core';
import { Observable, fromEvent, map, startWith } from 'rxjs';
import { NetworkService } from '../../services/network.service';
import { ModalService } from '../../components/modal/modal.service';
import { VerifyBvnComponent } from './components/verify-bvn/verify-bvn.component';

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
    private modalService: ModalService
  ) {
    // this.networkService.isOnline$.subscribe((v) => {
    //   this.online = v;
    // });
    // this.networkService.isOffline$.subscribe((v) => {
    //   this.online = v;
    // });
  }

  ngOnInit() {
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
