export interface BankAccount {
  id: number;
  user_id: number;
  bank_name: string;
  bank_code: string;
  holder_name: string;
  account_number: string;
  transfer_type: 'inter' | 'intra';
  status: 0 | 1;
  primary: 0 | 1 | boolean;
}

export interface Card {
  id: number;
  user_id: number;
  card_name: string;
  card_expiry: string;
  card_number: string;
  cvv: string;
}

export interface Bank {
  id: number;
  code: string;
  name: string;
}
