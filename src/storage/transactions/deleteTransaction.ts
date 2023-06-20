import { ITransaction } from "../../types/transactions-types";
import { TRANSACTIONS_COLLECTION } from "../storage.config";
import { getAllTransactions } from "./getAllTransactions";

export function deleteTransaction(id: string) {
  const storedTransactions = getAllTransactions();

  const newTransactions = storedTransactions.filter(
    (transaction: ITransaction) => transaction.id !== id
  );

  localStorage.setItem(
    TRANSACTIONS_COLLECTION,
    JSON.stringify(newTransactions)
  );
}
