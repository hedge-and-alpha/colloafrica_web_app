import { Component } from '@angular/core';
import { ColsField3Component } from '../../../../../components/cols-field-3/cols-field-3.component';
import { FormFieldComponent } from '../../../../../components/form-field/form-field.component';
import { CardComponent } from '../../../components/card/card.component';
import { ProfileCardComponent } from '../personal-info/profile-card/profile-card.component';

@Component({
  selector: 'ca-id-verification',
  standalone: true,
  templateUrl: './id-verification.component.html',
  styleUrl: './id-verification.component.css',
  imports: [
    CardComponent,
    ColsField3Component,
    FormFieldComponent,
    ProfileCardComponent,
  ],
})
export class IdVerificationComponent {}
