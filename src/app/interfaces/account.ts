export interface Account {
  account_number: string;
  account_first_name: string;
  account_last_name: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  virtual_account_id: number;
  transaction_id: string;
  session_id: string | null;
  type: string;
  reference: string | null;
  amount: string;
  processing_fee: number;
  total_amount: string;
  flow: string;
  remark: string;
  description: string;
  source: string;
  source_id: string;
  destination: string;
  destination_id: string;
  provider: string;
  provider_status: string;
  created_at: string;
}
