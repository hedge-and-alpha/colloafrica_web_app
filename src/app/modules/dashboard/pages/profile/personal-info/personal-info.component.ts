import { Component } from '@angular/core';
import { ProfileCardComponent } from '../../../components/profile-card/profile-card.component';
import { CardComponent } from '../../../components/card/card.component';
import { ColsField3Component } from '../../../../../components/cols-field-3/cols-field-3.component';
import { FormFieldComponent } from '../../../../../components/form-field/form-field.component';

@Component({
  selector: 'ca-personal-info',
  standalone: true,
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
  imports: [
    CardComponent,
    ColsField3Component,
    FormFieldComponent,
    ProfileCardComponent,
  ],
})
export class PersonalInfoComponent {}
