import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { ColsField3Component } from '../../../../../components/cols-field-3/cols-field-3.component';
import { FormFieldComponent } from '../../../../../components/form-field/form-field.component';
import { ProfileCardComponent } from '../../../components/profile-card/profile-card.component';

@Component({
  selector: 'ca-bvn',
  standalone: true,
  templateUrl: './bvn.component.html',
  styleUrl: './bvn.component.css',
  imports: [
    CardComponent,
    ColsField3Component,
    FormFieldComponent,
    ProfileCardComponent,
  ],
})
export class BvnComponent {}
