import {Account} from './account.model';

export interface Transaction {
  id: number;
  date: Date;
  type: string;
  description: string;
  amount: number;
  account: Account;
}
