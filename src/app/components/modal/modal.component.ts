import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  computed,
  effect,
} from '@angular/core';
import { ModalConfig, ModalService } from './modal.service';

@Component({
  selector: 'ca-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  isOpen = computed(() => this.modalService.isOpen());
  size = computed(() => this.modalService.size());
  componentClass = computed(() => this.modalService.componentClass());
  componentInputs = computed(() => this.modalService.componentInputs());
  config = computed(() => this.modalService.config());

  constructor(
    private modalService: ModalService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    effect(() => {
      const mainContent = document.querySelector('.main-content');
      if (this.isOpen()) {
        // this.config = this.modalService.config;
        this.renderer.appendChild(document.body, this.elementRef.nativeElement);
        this.renderer.addClass(document.body, 'overflow-hidden');
        this.renderer.setStyle(mainContent, 'overflow-y', 'hidden');
      } else {
        this.renderer.removeClass(document.body, 'overflow-hidden');
        this.renderer.setStyle(mainContent, 'overflow-y', 'scroll');
      }
    });
  }

  ngOnInit() {}

  closeModal() {
    this.modalService.close();
  }
}
