import { Component, Input } from '@angular/core';
import { ButtonPrimaryDirective } from '../../directives/button-primary/button-primary.directive';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'ca-modal-status',
  standalone: true,
  imports: [ButtonPrimaryDirective],
  templateUrl: './modal-status.component.html',
  styleUrl: './modal-status.component.css',
})
export class ModalStatusComponent {
  @Input() success = true;
  @Input() message = '';

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.close();
  }
}
