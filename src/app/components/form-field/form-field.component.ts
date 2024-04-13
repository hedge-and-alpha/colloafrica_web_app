import { Component, Input } from '@angular/core';

@Component({
  selector: 'ca-form-field',
  standalone: true,
  imports: [],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css',
})
export class FormFieldComponent {
  @Input() labelFor = '';
  @Input() label = '';
  @Input() isRequired = false;
}
