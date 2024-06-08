import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { TablePagination } from '../../interfaces/api-response';
import { TableHeading } from '../../interfaces/table-heading';

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
  @Input() hasPagination = true;
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
