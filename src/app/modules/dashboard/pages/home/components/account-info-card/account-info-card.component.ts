import { Component, computed } from '@angular/core';
import { UserStoreService } from '../../../../../../stores+/user.store';

@Component({
  selector: 'ca-account-info-card',
  templateUrl: './account-info-card.component.html',
  styles: `
  :host progress::-webkit-progress-bar, :host progress {
    background: #d0d0d0;
  }

  :host progress::-webkit-progress-value {
    background-color: var(--purple);
  }

  :host progress::-moz-progress-bar {
    background-color: var(--purple);
  }
  `,
})
export class AccountInfoCardComponent {
  virtualAccount = computed(() => this.userStore.user?.virtual_account);

  constructor(private userStore: UserStoreService) {}
}
