import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";
import { ITransaction } from "../types/transactions-types";

import { v4 as uuidv4 } from "uuid";

import { addNewTransaction } from "../storage/transactions/addNewTransaction";
import { getAllTransactions } from "../storage/transactions/getAllTransactions";

interface TransactionContextType {
  transactions: ITransaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
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

  const fetchTransactions = useCallback(async () => {
    const transactions = getAllTransactions();
    setTransactions(transactions);
  }, []);

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
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
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, fetchTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
