import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";

import { ITransaction } from "../types/transactions-types";

import { v4 as uuidv4 } from "uuid";

import { addNewTransaction } from "../storage/transactions/addNewTransaction";
import { getAllTransactions } from "../storage/transactions/getAllTransactions";

import { deleteTransaction as deleteStorageTransaction } from "../storage/transactions/deleteTransaction";
import { updateTransaction as updateTransactionStorage } from "../storage/transactions/updateTransaction";

interface TransactionContextType {
	transactions: ITransaction[];
	fetchTransactions: (query?: string) => void;
	createTransaction: (data: CreateTransactionInput) => void;
	deleteTransaction: (id: string) => void;
	updateTransaction: (data: ITransaction) => void;
}

interface TransactionsProviderProps {
	children: ReactNode;
}

interface CreateTransactionInput {
	description: string;
	price: number;
	category: string;
	type: "income" | "outcome";
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
	const [transactions, setTransactions] = useState<ITransaction[]>([]);

	const fetchTransactions = useCallback((query?: string) => {
		const transactions = getAllTransactions(query);
		setTransactions(transactions);
	}, []);

	const createTransaction = useCallback(async (data: CreateTransactionInput) => {
		const { description, price, category, type } = data;

		const transaction = {
			id: uuidv4(),
			description,
			price,
			category,
			type,
			createdAt: new Date().toISOString(),
		};

		addNewTransaction(transaction);

		setTransactions((prevState) => [...prevState, transaction]);
	}, []);

	const deleteTransaction = useCallback((id: string) => {
		try {
			deleteStorageTransaction(id);
			fetchTransactions();
		} catch (error) {
			console.log(error);
		}
	}, []);

	const updateTransaction = useCallback((data: ITransaction) => {
		try {
			updateTransactionStorage(data);
			fetchTransactions();
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions]);

	return (
		<TransactionsContext.Provider
			value={{
				transactions,
				createTransaction,
				fetchTransactions,
				deleteTransaction,
				updateTransaction,
			}}
		>
			{children}
		</TransactionsContext.Provider>
	);
}
