import {TransactionView} from './transaction-view.model';

export interface GroupSubcategories {
  id: number;
  name: string;
  spent: number;
  transactions: TransactionView[];
}
