import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { MGR, MGRUser } from '../../../../../../interfaces/mgr.interface';

@Component({
  selector: 'ca-mgr-plan',
  templateUrl: './mgr-plan.component.html',
  styleUrl: './mgr-plan.component.css',
})
export class MgrPlanComponent implements OnInit {
  inviteLink: null | string = null;
  isBvnVerified = false;
  isNewlyCreatedPlan = false;
  plan: MGR = history.state['plan'];

  users: MGRUser[] = [];

  constructor(
    private modalService: ModalService,
    private route: ActivatedRoute
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
      return (
        await import('../../components/mgr-welcome/mgr-welcome.component')
      ).MgrWelcomeComponent;
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
}
