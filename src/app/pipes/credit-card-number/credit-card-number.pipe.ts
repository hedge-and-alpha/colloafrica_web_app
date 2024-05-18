import { Pipe, PipeTransform } from '@angular/core';
import { card } from 'creditcards';

@Pipe({
  name: 'creditCardNumber',
  standalone: true,
})
export class CreditCardNumberPipe implements PipeTransform {
  transform(value: string): string {
    return card.format(value);
  }
}
