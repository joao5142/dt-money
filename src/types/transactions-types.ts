export interface ITransaction {
	id: string;
	description: string;
	type: "income" | "outcome";
	price: number;
	category: string;
	createdAt: string;
}
