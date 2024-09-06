import { Component, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TablePagination } from '../../../../interfaces/api-response';
import { TableHeading } from '../../../../interfaces/table-heading';
import { DashboardApiService } from '../../../../services/api/dashboard-api.service';
import { TransactionStoreService } from '../../../../stores+/transaction.store';

@Component({
  selector: 'ca-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  currentPage = 1;
  tableHeading = TABLE_HEADING;
  tableData = computed(() => this.transactionStore.transactions());
  pagination!: TablePagination;

  constructor(
    private api: DashboardApiService,
    private router: Router,
    private route: ActivatedRoute,
    private transactionStore: TransactionStoreService
  ) {}

  ngOnInit() {
    const page = this.route.snapshot.queryParamMap.get('page');
    this.currentPage = page ? +page : 1;
    this.getTransactions(this.currentPage);
  }

  getTransactions(page: number) {
    this.api.getTransactions(page).subscribe({
      next: ({ data }) => {
        let pagination: TablePagination = {
          current_page: data.current_page,
          last_page: data.last_page,
          next_page_url: data.next_page_url,
          per_page: data.per_page,
          prev_page_url: data.prev_page_url,
          total: data.total,
        };
        this.pagination = pagination;
      },
    });
  }

  handlePrevPageClick() {
    this.currentPage--;
    this.getTransactions(this.currentPage);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.currentPage,
      },
    });
  }

  handleNextPageClick() {
    this.currentPage++;
    this.getTransactions(this.currentPage);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.currentPage,
      },
    });
  }
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Transaction ID' },
  { label: 'Amount' },
  { label: 'Trans. Date' },
  { label: 'Status' },
  { label: 'Type' },
  // { label: 'Debited From' },
  { label: 'Comment' },
];
