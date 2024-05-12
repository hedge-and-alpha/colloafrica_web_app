import { Component } from '@angular/core';

@Component({
  selector: 'ca-start-plan-card',
  template: `
    <ca-card class="rounded-xl h-[148px]">
      <div
        class="h-full flex items-center justify-center gap-5 px-4 md:px-2 xl:px-10"
      >
        <img
          src="assets/images/ajo-group.webp"
          alt="Ajo group"
          width="131"
          height="140"
        />
        <div>
          <p class="mb-4">Save with Ajo, Adashe, or Esusu group</p>
          <a
            routerLink="/mgr/new"
            class="inline-flex items-center btn-xs rounded-md bg-warning px-2 sm:px-4 md:px-2 lg:px-4"
          >
            Start a plan now
          </a>
        </div>
      </div>
    </ca-card>
  `,
})
export class StartPlanCardComponent {}
