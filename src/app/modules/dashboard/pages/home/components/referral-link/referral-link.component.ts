import { Component, computed } from '@angular/core';
import { UserStoreService } from '../../../../../../stores+/user.store';

@Component({
  selector: 'ca-referral-link',
  templateUrl: './referral-link.component.html',
})
export class ReferralLinkComponent {
  referralLink!: string;

  user = computed(() => this.userStore.user);

  constructor(private userStore: UserStoreService) {
    this.referralLink = `${location.origin}/auth/sign-up?referral_code=${
      this.user()!.referral_code
    }`;
  }
}
