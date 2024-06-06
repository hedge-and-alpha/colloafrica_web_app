import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ca-mgr-create-edit',
  templateUrl: './mgr-create-edit.component.html',
  styleUrl: './mgr-create-edit.component.css',
})
export class MgrCreateEditComponent implements OnInit {
  formTemplate: FormTemplate = 'new';
  pageTitle = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const view = this.route.snapshot.paramMap.get('action');

    if (view) {
      this.formTemplate = view as FormTemplate;

      if (this.formTemplate === 'new') {
        this.pageTitle = 'New MGR Plan';
      } else if (this.formTemplate === 'edit') {
        this.pageTitle = 'Edit MGR Plan';
      } else {
        this.pageTitle = 'Join MGR Plan';
      }
    }
  }
}

type FormTemplate = 'new' | 'join' | 'edit';
