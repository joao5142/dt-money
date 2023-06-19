import { TRANSACTIONS_COLLECTION } from "../storage.config";

export function getAllTransactions() {
  const storage = localStorage.getItem(TRANSACTIONS_COLLECTION);

  const storedTransactions = storage ? JSON.parse(storage) : [];

  return storedTransactions;
}
