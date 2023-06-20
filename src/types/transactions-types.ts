export interface ITransaction {
  id: number | string;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}
