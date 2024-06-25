import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '../../../../../../components/modal/modal.service';

@Component({
  selector: 'ca-allotment-type',
  templateUrl: './allotment-type.component.html',
  styleUrl: './allotment-type.component.css',
})
export class AllotmentTypeComponent implements OnInit {
  selectedPosition: number | null = null;

  allowableNumbers: number[] = [];

  @Input() numberOfMembers!: number;

  @Output() numberOfMembersChange = new EventEmitter<number>();

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.allowableNumbers = Array.from(
      { length: this.numberOfMembers },
      (_, i) => i + 1
    );
  }

  handlePositionChange(event: number) {
    this.selectedPosition = event;
  }

  handleTypeSelection(type: 'manual' | 'auto') {
    this.modalService.close({ position: this.selectedPosition, type });
  }
}
