import { Component } from '@angular/core';
import { ProfileCardComponent } from '../../../components/profile-card/profile-card.component';
import { CardComponent } from '../../../components/card/card.component';

@Component({
  selector: 'ca-personal-info',
  standalone: true,
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
  imports: [CardComponent, ProfileCardComponent],
})
export class PersonalInfoComponent {}
