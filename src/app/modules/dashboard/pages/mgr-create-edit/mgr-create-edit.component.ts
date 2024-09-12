import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../../components/alert/alert.service';

@Component({
  selector: 'ca-mgr-create-edit',
  templateUrl: './mgr-create-edit.component.html',
  styleUrl: './mgr-create-edit.component.css',
})
export class MgrCreateEditComponent implements OnInit {
  inviteId = '';
  formTemplate: FormTemplate = 'new';
  pageTitle = '';
  processing = false;

  constructor(private route: ActivatedRoute, private router: Router,
    private alert: AlertService,
    private api: DashboardApiService,) {}

  ngOnInit() {
    this.processing = true;
    const view = this.route.snapshot.paramMap.get('action');

    if (view) {
      this.formTemplate = view as FormTemplate;

      if (this.formTemplate === 'new') {
        this.pageTitle = 'New MGR Plan';
        this.processing = false;
      } else if (this.formTemplate === 'edit') {
        this.pageTitle = 'Edit MGR Plan';
        this.processing = false;
      } else {
        this.pageTitle = 'Join MGR Plan';
        this.processing = true;
        let inviteIdQueryParam = this.route.snapshot.queryParamMap.get('invite_id');
        if (inviteIdQueryParam) {
          this.inviteId = inviteIdQueryParam;
          this.getMgrDetails(this.inviteId);
        } else {
          this.alert.open('danger', { details: 'Invalid invitation link.'});
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        }
      }
    }
  }

  today = new Date();
  joinDate = new Date();
  getMgrDetails(link: string) {
    this.api.getMgrByInviteLink(link).subscribe({
      next: ({ data: { mgr, available_positions } }) => {
        // this.joinDate = new Date(mgr.join_date_deadline);
        // if (this.today.getTime() > this.joinDate.getTime()) {
        //   this.alert.open('danger', { details: 'The MGR link is currently invalid.'});
        //   setTimeout(() => {
        //     this.router.navigate(['/']);
        //   }, 3000);
          
        // } else {
          this.processing = false;
        // }
      },
      error: (err: HttpErrorResponse) => {
        this.alert.open('danger', { details: 'The MGR link is currently invalid.'});
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
    });
  }
}

type FormTemplate = 'new' | 'join' | 'edit';
