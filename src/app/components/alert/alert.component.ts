import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  computed,
} from '@angular/core';
import { AlertService } from './alert.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'ca-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent implements OnInit, OnDestroy {
  show = computed(() => this.alertService.show());
  variant = computed(() => this.alertService.type());
  config = computed(() => this.alertService.config());

  timerSub!: Subscription;

  constructor(
    private alertService: AlertService,
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) {
    if (this.show()) {
      this.renderer.appendChild(document.body, this.elementRef.nativeElement);
    }
  }

  ngOnInit() {
    this.timerSub = timer(5000).subscribe(() => this.close());
  }

  ngOnDestroy() {
    console.log('alert destroyed');
    this.timerSub?.unsubscribe();
  }

  close() {
    this.alertService.close();
    this.renderer.removeChild(document.body, this.elementRef.nativeElement);
  }
}
