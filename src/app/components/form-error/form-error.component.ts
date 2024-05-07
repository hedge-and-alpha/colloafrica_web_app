import { KeyValuePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { VALIDATION_ERROR_MESSAGES } from './validation-error-messages.token';

@Component({
  selector: 'ca-form-error',
  standalone: true,
  imports: [KeyValuePipe],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {
  @Input() errors?: ValidationErrors | null = null;

  errorsMap = inject(VALIDATION_ERROR_MESSAGES);
}
