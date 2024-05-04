import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'ca-otp',
  standalone: true,
  imports: [],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent {
  @Input() size = 6;
  @ViewChildren('input', { read: ElementRef })
  inputRefs!: QueryList<ElementRef>;

  inputs = Array.from({ length: this.size });

  ngAfterViewInit() {
    console.log('[inputs]:', this.inputRefs);
    (<HTMLInputElement>this.inputRefs.first.nativeElement).focus();
  }

  handleInput(event: Event, idx: number) {
    const elem = event.target as HTMLInputElement;
    console.log({ [idx]: elem.value });
    const isDigit = /\d/.test(elem.value);

    if (!isDigit) {
      elem.value = '';
      return;
    }

    const next = elem.nextElementSibling;

    if (elem.value.length > 1) {
      event.preventDefault();
      return;
    }

    if (next) {
      (next as HTMLInputElement).focus();
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    const isDelete =
      event.key.toLowerCase() === 'backspace' ||
      event.key.toLowerCase() === 'delete';

    if (isDelete) {
      const prev = target.previousElementSibling as HTMLInputElement;

      if (prev) {
        prev.select();
      }
    }
  }
}
