import { Component, computed, inject } from '@angular/core';
import { UserStoreService } from '../../../../stores+/user.store';

@Component({
  selector: 'ca-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private store = inject(UserStoreService);
  user = computed(() => this.store.user);
}
