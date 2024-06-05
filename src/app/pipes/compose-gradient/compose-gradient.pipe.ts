import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'composeGradient',
  standalone: true
})
export class ComposeGradientPipe implements PipeTransform {
  transform(value: string): Record<string, string> {
    let [stop1, stop2] = value.split(' ');

    return {
      backgroundImage: `linear-gradient(58.91deg, ${stop1} 9.35%, ${stop2} 91.36%)`,
    };
  }
}
