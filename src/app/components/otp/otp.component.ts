import { Component, Input } from '@angular/core';

@Component({
  selector: 'ca-otp',
  standalone: true,
  imports: [],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent {
  @Input() size = 6;
  inputs = Array.from({ length: this.size });
}
