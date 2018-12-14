import {Transaction} from './transaction.model';

export interface Group {
  id: number;
  name: string;
  spent: number;
  transactionsList: Transaction[];
}
