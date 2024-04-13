import { Component } from '@angular/core';
import { FormFieldComponent } from '../../../../components/form-field/form-field.component';
import { ColsField2Component } from '../../../../components/cols-field-2/cols-field-2.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ca-signup-form',
  standalone: true,
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
  imports: [RouterLink, ColsField2Component, FormFieldComponent],
})
export class SignupFormComponent {}
