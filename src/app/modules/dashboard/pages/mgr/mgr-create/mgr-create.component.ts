import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ca-mgr-create',
  templateUrl: './mgr-create.component.html',
  styleUrl: './mgr-create.component.css',
})
export class MgrCreateComponent implements OnInit {
  formTemplate: FormTemplate = 'new';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const view = this.route.snapshot.paramMap.get('view');

    if (view) {
      this.formTemplate = view as FormTemplate;
    }
  }
}

type FormTemplate = 'new' | 'join';
