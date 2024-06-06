import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  computed,
  effect,
} from '@angular/core';
import { ModalService } from './modal.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ca-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit, OnDestroy {
  isOpen = computed(() => this.modalService.isOpen());
  size = computed(() => this.modalService.size());
  componentClass = computed(() => this.modalService.componentClass());
  componentInputs = computed(() => this.modalService.componentInputs());
  config = computed(() => this.modalService.config());

  routerSub!: Subscription;

  constructor(
    private modalService: ModalService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router
  ) {
    effect(() => {
      if (this.isOpen()) {
        this.renderer.appendChild(document.body, this.elementRef.nativeElement);
        this.renderer.addClass(document.body, 'overflow-hidden');
      } else {
        this.renderer.removeClass(document.body, 'overflow-hidden');
      }
    });
  }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe({
      next: (event) => {
        if (
          event instanceof NavigationStart ||
          event instanceof NavigationEnd
        ) {
          this.closeModal();
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  closeModal() {
    this.modalService.close();
  }
}
