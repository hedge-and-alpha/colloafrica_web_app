import { Component, Input } from '@angular/core';
import { ButtonPrimaryDirective } from '../../directives/button-primary/button-primary.directive';
import { ModalService } from '../modal/modal.service';
import { PaperPlaneIconComponent } from '../../icons/paper-plane-icon.component';
import { XCircleFillIconComponent } from '../../icons/x-circle-fill-icon.component';
import { SealCheckIconComponent } from '../../icons/seal-check-icon.component';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first/capitalize-first.pipe';

@Component({
  selector: 'ca-modal-status',
  standalone: true,
  imports: [
    ButtonPrimaryDirective,
    XCircleFillIconComponent,
    SealCheckIconComponent,
    CapitalizeFirstPipe,
  ],
  templateUrl: './modal-status.component.html',
  styleUrl: './modal-status.component.css',
})
export class ModalStatusComponent {
  @Input() status = '';
  @Input() message = '';
  @Input() success = true;

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.close();
  }
}
