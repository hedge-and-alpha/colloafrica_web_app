import { Component, OnInit } from '@angular/core';
import { TableHeading } from '../../../../../../interfaces/table-heading';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { Transaction } from '../../../../../../interfaces/account';
import { TablePagination } from '../../../../../../interfaces/api-response';
import { ActivatedRoute, Router } from '@angular/router';

interface TransactionsResponseData {
  transactions: Transaction[];
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  total: number;
}

@Component({
  selector: 'ca-wallet-account-transactions',
  templateUrl: './wallet-account-transactions.component.html',
  styleUrl: './wallet-account-transactions.component.css',
})
export class WalletAccountTransactionsComponent implements OnInit {
  currentPage = 1;
  tableHeading = TABLE_HEADING;
  pagination!: TablePagination;
  tableData: Transaction[] = [];

  constructor(
    private api: DashboardApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const page = this.route.snapshot.queryParamMap.get('page');
    this.currentPage = page ? +page : 1;
    this.getTransactions(this.currentPage);
  }

  getTransactions(page: number) {
    this.api.getTransactions(page).subscribe({
      next: (response) => {
        const data = response.data as TransactionsResponseData;
        this.tableData = data.transactions;
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
    this.tableData = [];
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
    this.tableData = [];
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
  { label: 'Debit/Credit' },
];
