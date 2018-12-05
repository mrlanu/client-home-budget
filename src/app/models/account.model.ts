export interface Account {
  id: number;
  name: string;
  type: string;
  currency: string;
  balance: number;
  includeInTotal: boolean;
}
