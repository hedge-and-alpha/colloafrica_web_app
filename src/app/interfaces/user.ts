export interface User {
  first_name: string;
  last_name: string;
  profile_picture: string | null;
  dob: string | null;
  gender: string | null;
  marital_status: string | null;
  email: string;
  phone_number: string;
  id_number: string | null;
  id_type: string | null;
  address: string | null;
  nearest_landmark: string | null;
  lga: string | null;
  state: string | null;
  nationality: string | null;
  home_town: string | null;
  occupation: string | null;
  employer: string | null;
  employer_address: string | null;
  nok_name: string | null;
  nok_phone_number: string | null;
  nok_email: string | null;
  nok_address: string | null;
  nok_relationship: string | null;
  referral_code: string | null;
  kyc_status: number;
  nin_verification_status: 0 | 1;
  bvn_verification_status: 0 | 1;
  bvn: {
    bvn: string;
  };
  virtual_account: null | {
    account_number: string;
    account_first_name: string;
    account_last_name: string;
    bank_name: string;
    account_balance: string;
  };
}

export type BasicInfo = Pick<
  User,
  'first_name' | 'last_name' | 'gender' | 'dob' | 'marital_status'
>;

export type ContactInfo = Pick<
  User,
  | 'address'
  | 'email'
  | 'home_town'
  | 'lga'
  | 'phone_number'
  | 'state'
  | 'nationality'
  | 'nearest_landmark'
>;

export type EmploymentInfo = Pick<
  User,
  'employer' | 'employer_address' | 'occupation'
>;

export type NextOfKinInfo = Pick<
  User,
  | 'nok_address'
  | 'nok_email'
  | 'nok_name'
  | 'nok_phone_number'
  | 'nok_relationship'
>;

export type IDCard = Pick<User, 'id_number' | 'id_type'>;
