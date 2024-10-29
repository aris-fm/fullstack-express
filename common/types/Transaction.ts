export interface Transaction {
  id: number;
  amount: number;
  description?: string;
  category_id: number | null;
}
