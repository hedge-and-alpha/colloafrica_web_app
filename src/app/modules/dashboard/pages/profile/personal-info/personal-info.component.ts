import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { BasicComponent } from './basic/basic.component';
import { ContactComponent } from './contact/contact.component';
import { EmploymentComponent } from './employment/employment.component';
import { NokComponent } from './nok/nok.component';

@Component({
  selector: 'ca-personal-info',
  standalone: true,
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
  imports: [
    CardComponent,
    ProfileCardComponent,
    BasicComponent,
    ContactComponent,
    EmploymentComponent,
    NokComponent,
  ],
})
export class PersonalInfoComponent {}
