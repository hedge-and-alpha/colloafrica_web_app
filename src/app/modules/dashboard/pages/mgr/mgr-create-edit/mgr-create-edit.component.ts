import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ca-mgr-create-edit',
  templateUrl: './mgr-create-edit.component.html',
  styleUrl: './mgr-create-edit.component.css',
})
export class MgrCreateEditComponent implements OnInit {
  formTemplate: FormTemplate = 'new';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const view = this.route.snapshot.paramMap.get('view');

    if (view) {
      this.formTemplate = view as FormTemplate;
    }
  }
}

type FormTemplate = 'new' | 'join' | 'edit';
