import { Component, OnInit } from '@angular/core';
import { TableHeading } from '../../../../interfaces/table-heading';
import { ModalService } from '../../../../components/modal/modal.service';
import { MgrWelcomeComponent } from './components/mgr-welcome/mgr-welcome.component';
import { UserStoreService } from '../../../../stores+/user.store';
import { VerifyBvnComponent } from '../../components/verify-bvn/verify-bvn.component';

@Component({
  selector: 'ca-mgr-details',
  templateUrl: './mgr-details.component.html',
  styleUrl: './mgr-details.component.css',
})
export class MgrDetailsComponent implements OnInit {
  isBvnVerified = false;

  tableHeading = TABLE_HEADING;

  constructor(
    private modalService: ModalService,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.isBvnVerified =
      this.userStore.user?.bvn_verification_status === 1 ? true : false;

    async function loadMgrWelcome() {
      return (await import('./components/mgr-welcome/mgr-welcome.component'))
        .MgrWelcomeComponent;
    }

    if (!this.isBvnVerified) {
      loadMgrWelcome().then((MgrWelcomeComponent) => {
        this.modalService.open(MgrWelcomeComponent, 'regular', {
          showHeading: false,
        });
      });
    }
  }
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Name' },
  { label: 'Role' },
  { label: 'Position' },
  { label: 'Status' },
  { label: 'Joined' },
  { label: 'Action' },
];
