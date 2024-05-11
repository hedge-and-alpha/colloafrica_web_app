import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { ColsField3Component } from '../../../../../components/cols-field-3/cols-field-3.component';
import { PaymentCardComponent } from '../../../components/payment-card/payment-card.component';
import { ModalService } from '../../../../../components/modal/modal.service';
import { PaymentCardFormComponent } from '../../../components/payment-card-form/payment-card-form.component';

@Component({
  selector: 'ca-cards',
  standalone: true,
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
  imports: [CardComponent, ColsField3Component, PaymentCardComponent],
})
export class CardsComponent {
  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService.open(PaymentCardFormComponent, 'regular', {
      closable: true,
      showHeading: true,
      headingText: 'Enter card details',
    });
  }
}
