import { ITransaction } from "../../types/transactions-types";
import { TRANSACTIONS_COLLECTION } from "../storage.config";
import { getAllTransactions } from "./getAllTransactions";

export function addNewTransaction(transaction: ITransaction) {
  const storedTransactions = getAllTransactions();

  storedTransactions.push(transaction);

  localStorage.setItem(
    TRANSACTIONS_COLLECTION,
    JSON.stringify(storedTransactions)
  );
}
