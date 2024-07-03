import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';

@Component({
  selector: 'ca-change-position',
  templateUrl: './change-position.component.html',
  styleUrl: './change-position.component.css',
})
export class ChangePositionComponent {
  loading = false;

  @Input() availablePositions!: string[] | number[];

  constructor(
    private modalService: ModalService,
    private api: DashboardApiService
  ) {}
}
