import {
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  computed,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertService } from './alert.service';
import { NavigationEnd, NavigationSkipped, Router } from '@angular/router';

@Component({
  selector: 'ca-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent implements OnInit {
  alerts = computed(() => this.alertService.alerts());

  constructor(
    private alertService: AlertService,
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    private router: Router,
    private destroyRef: DestroyRef
  ) {
    if (this.alerts()) {
      this.renderer.appendChild(document.body, this.elementRef.nativeElement);
    }
  }

  ngOnInit() {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (event) => {
        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationSkipped
        ) {
          this.alertService.closeAll();
        }
      },
    });
  }

  close(id: string) {
    this.alertService.close(id);
    // this.renderer.removeChild(document.body, this.elementRef.nativeElement);
  }
}
