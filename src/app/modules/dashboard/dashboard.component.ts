import { Component, computed, signal } from '@angular/core';
import { Observable, fromEvent, map, startWith } from 'rxjs';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'ca-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  online = true;

  constructor(private networkService: NetworkService) {
    // this.networkService.isOnline$.subscribe((v) => {
    //   this.online = v;
    // });
    // this.networkService.isOffline$.subscribe((v) => {
    //   this.online = v;
    // });
  }

  ngOnInit() {}

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
