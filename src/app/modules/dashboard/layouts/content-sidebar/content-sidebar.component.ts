import { Component, Input } from '@angular/core';
import { AsideCardComponent } from '../../components/aside-card/aside-card.component';

@Component({
  selector: 'ca-content-sidebar',
  standalone: true,
  templateUrl: './content-sidebar.component.html',
  styleUrl: './content-sidebar.component.css',
  imports: [AsideCardComponent],
})
export class ContentSidebarComponent {
  @Input() showBorderBottom = true;
}
