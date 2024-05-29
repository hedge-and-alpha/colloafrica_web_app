import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { TableHeading } from '../../interfaces/table-heading';
import { CommonModule } from '@angular/common';
import { TablePagination } from '../../interfaces/api-response';

@Component({
  selector: 'ca-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements AfterContentInit {
  tableRow!: TemplateRef<unknown>;

  @Input() loading = false;
  @Input() paginationData!: TablePagination;
  @Input() tableHeading: TableHeading[] = [];
  @Input() tableData: Record<string, any>[] = [];

  @Output() onPrevClick = new EventEmitter();
  @Output() onNextClick = new EventEmitter();

  @ContentChild('tableBody') tBody!: TemplateRef<unknown>;

  ngAfterContentInit() {
    this.tableRow = this.tBody;
  }
}
