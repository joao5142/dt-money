import { ITransaction } from "../../types/transactions-types";
import { TRANSACTIONS_COLLECTION } from "../storage.config";
import { getAllTransactions } from "./getAllTransactions";

export function updateTransaction(transaction: ITransaction) {
	const storedTransactions = getAllTransactions();

	const newStoredTransactions = storedTransactions.map((t: ITransaction) => {
		if (t.id === transaction.id) {
			return { ...transaction };
		} else {
			return t;
		}
	});

	localStorage.setItem(TRANSACTIONS_COLLECTION, JSON.stringify(newStoredTransactions));
}
