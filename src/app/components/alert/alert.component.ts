import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  computed,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';

@Component({
  selector: 'ca-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent implements OnInit, OnDestroy {
  alerts = computed(() => this.alertService.alerts());

  timerSub!: Subscription;

  constructor(
    private alertService: AlertService,
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) {
    if (this.alerts()) {
      this.renderer.appendChild(document.body, this.elementRef.nativeElement);
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.timerSub?.unsubscribe();
  }

  close(id: string) {
    this.alertService.close(id);
    // this.renderer.removeChild(document.body, this.elementRef.nativeElement);
  }
}
