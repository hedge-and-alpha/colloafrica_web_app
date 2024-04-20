import {
  Component,
  ContentChild,
  ContentChildren,
  Input,
  TemplateRef,
} from '@angular/core';
import { TableHeading } from '../../interfaces/table-heading';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ca-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  currentPage = 1;
  tableRow!: TemplateRef<unknown>;

  @Input() loading = false;
  @Input() tableHeading: TableHeading[] = [];
  @Input() tableData: Record<string, any>[] = [];

  @ContentChild('tableBody') tBody!: TemplateRef<unknown>;

  ngAfterContentInit() {
    this.tableRow = this.tBody;
  }
}
