import {Budget} from './budget.model';

export interface UserInfo {
  userId: number;
  username: string;
  budgets: Budget[];
}
