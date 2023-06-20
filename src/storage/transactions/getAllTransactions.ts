import { ITransaction } from "../../types/transactions-types";
import { TRANSACTIONS_COLLECTION } from "../storage.config";

export function getAllTransactions(query?: string) {
  const storage = localStorage.getItem(TRANSACTIONS_COLLECTION);

  let storedTransactions = storage ? JSON.parse(storage) : [];

  if (query) {
    storedTransactions = storedTransactions.filter(
      (transaction: ITransaction) => transaction.description.includes(query)
    );
  }

  return storedTransactions;
}
