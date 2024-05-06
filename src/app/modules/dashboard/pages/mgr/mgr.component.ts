import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ca-mgr',
  templateUrl: './mgr.component.html',
  styleUrl: './mgr.component.css',
})
export class MgrComponent implements OnInit, OnDestroy {
  view: 'intro' | 'new' | 'join' = 'intro';

  paramSub!: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      const p = param.get('view');
      this.view = p as 'intro' | 'new' | 'join';
    });
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
  }
}
