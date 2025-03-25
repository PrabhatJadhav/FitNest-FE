import { LifestyleType } from '../enums/lifestyle-type.enum';

export interface User {
  id: string;
  email: string;
  createdAt: number;
  updatedAt: number;
  lifestyle_type: LifestyleType;
  diet_type: string;
  total_sleep: number;
  eat_out: number;
}
