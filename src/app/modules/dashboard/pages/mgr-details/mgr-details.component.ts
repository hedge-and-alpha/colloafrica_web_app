import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../../../components/modal/modal.service';
import { MGR } from '../../../../interfaces/mgr.interface';
import { TableHeading } from '../../../../interfaces/table-heading';
import { UserStoreService } from '../../../../stores+/user.store';

@Component({
  selector: 'ca-mgr-details',
  templateUrl: './mgr-details.component.html',
  styleUrl: './mgr-details.component.css',
})
export class MgrDetailsComponent implements OnInit {
  inviteLink: null | string = null;
  isBvnVerified = false;
  plan: MGR = history.state['plan'] as MGR;

  tableHeading = TABLE_HEADING;

  constructor(
    private modalService: ModalService,
    private userStore: UserStoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.inviteLink = `${location.origin}/mgr/${this.plan.id}/join?invite_id=${this.plan.invite_link}`;

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

  editPlan() {
    this.router.navigate(['/', 'mgr', this.plan.id, 'edit'], {
      state: { plan: this.plan },
    });
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
