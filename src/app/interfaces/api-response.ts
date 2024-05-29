export interface ApiResponse {
  status: string;
  message: string;
}

export interface TablePagination {
  current_page: number;
  last_page: number;
  next_page_url: null | string;
  per_page: number;
  prev_page_url: null | string;
  total: number;
}
