
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { TransactionContextType, Transaction } from "../types";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const TransactionContext = createContext<TransactionContextType | null>(null);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
};

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Carregar transações do localStorage
  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  // Salvar transações no localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: uuidv4(),
    };
    setTransactions([...transactions, newTransaction]);
    toast.success(`${transaction.type === "income" ? "Receita" : "Despesa"} adicionada com sucesso!`);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
    toast.info("Transação removida");
  };

  const getIncomeTotal = () => {
    return transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  const getExpenseTotal = () => {
    return transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  const getBalance = () => {
    return getIncomeTotal() - getExpenseTotal();
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        getIncomeTotal,
        getExpenseTotal,
        getBalance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
