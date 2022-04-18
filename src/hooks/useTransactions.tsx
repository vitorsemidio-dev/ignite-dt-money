import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

export type TransactionType = "deposit" | "withdraw";

interface Transaction {
  id: number;
  title: string;
  type: TransactionType;
  amount: number;
  category: string;
  createdAt: string;
}

type CreateTransactionDto = Omit<Transaction, "id" | "createdAt">;

interface TransactionsProviderProps {
  children: ReactNode;
}

type ResponseType = {
  transactions: Transaction[];
};

interface TransactionsContextData {
  transactions: Transaction[];
  addTransaction(transaction: CreateTransactionDto): Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get<ResponseType>("transactions").then((response) => {
      const { data } = response;
      console.log(data);
      setTransactions(data.transactions);
    });
  }, []);

  const addTransaction = useCallback(
    async (transactionInput: CreateTransactionDto) => {
      try {
        const { data } = await api.post("transactions", {
          ...transactionInput,
          createdAt: new Date(),
        });
        const { transaction } = data;

        setTransactions([...transactions, transaction]);
      } catch (err) {
        console.log(err);
      }
    },
    [transactions],
  );

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
      }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
