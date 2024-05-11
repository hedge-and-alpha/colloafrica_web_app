import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { CardComponent } from '../../modules/dashboard/components/card/card.component';

@Component({
  selector: 'ca-tooltip',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
})
export class TooltipComponent implements OnInit {
  private _message = '';
  private _top = 0;
  private _left = 0;

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit() {}

  get message() {
    return this._message;
  }

  set message(text: string) {
    this._message = text;
  }

  get top() {
    return this._top;
  }

  set top(value: number) {
    this._top = value;
  }

  get left() {
    return this._left;
  }

  set left(value: number) {
    this._left = value;
  }
}
