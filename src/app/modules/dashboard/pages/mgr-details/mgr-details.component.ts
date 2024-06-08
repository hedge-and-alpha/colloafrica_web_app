import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../../../components/modal/modal.service';
import { MGR, MGRUser } from '../../../../interfaces/mgr.interface';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { UserStoreService } from '../../../../stores+/user.store';

@Component({
  selector: 'ca-mgr-details',
  templateUrl: './mgr-details.component.html',
  styleUrl: './mgr-details.component.css',
})
export class MgrDetailsComponent implements OnInit {
  inviteLink: null | string = null;
  isBvnVerified = false;
  isNewlyCreatedPlan = false;
  plan: MGR = history.state['plan'];

  users: MGRUser[] = [];

  constructor(
    private modalService: ModalService,
    private userStore: UserStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private api: DashboardApiService
  ) {}

  ngOnInit() {
    this.inviteLink = `${location.origin}/mgr/${this.plan.id}/join?invite_id=${this.plan.invite_link}`;

    let newlyCreatedQueryParam =
      this.route.snapshot.queryParamMap.get('new_plan');

    if (newlyCreatedQueryParam) {
      this.isNewlyCreatedPlan = true;
      this.openModal(this.isNewlyCreatedPlan);
    }
  }

  openModal(isNew: boolean) {
    async function loadMgrWelcome() {
      return (await import('./components/mgr-welcome/mgr-welcome.component'))
        .MgrWelcomeComponent;
    }

    if (!this.isBvnVerified) {
      loadMgrWelcome().then((MgrWelcomeComponent) => {
        this.modalService.open(
          MgrWelcomeComponent,
          'small',
          {
            showHeading: false,
          },
          { isNewPlan: isNew }
        );
      });
    }
  }

  editPlan() {
    this.router.navigate(['/', 'mgr', this.plan.id, 'edit'], {
      state: { plan: this.plan },
    });
  }
}
