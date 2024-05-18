export interface Bank {
  id: number;
  code: string;
  name: string;
}

export interface BankAccount {
  id: number;
  user_id: number;
  bank_name: string;
  bank_code: string;
  account_number: string;
  transfer_type: 'inter' | 'intra';
  status: 0 | 1;
  primary: 0 | 1;
}

export interface Card {
  id: number;
  user_id: number;
  card_name: string;
  card_expiry: string;
  card_number_decrypted: string;
  cvv_decrypted: string;
}
