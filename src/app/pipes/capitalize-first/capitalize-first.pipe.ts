import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst',
  standalone: true,
})
export class CapitalizeFirstPipe implements PipeTransform {
  transform(value: string): string {
    if (!value.trim().length) return '';

    return value.trim().charAt(0).toUpperCase() + value.slice(1);
  }
}
