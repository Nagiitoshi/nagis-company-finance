
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { TransactionContextType, Transaction } from "../types";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO } from "date-fns";

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
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(new Date(), "yyyy-MM")
  );
  const { user } = useAuth();

  // Load transactions from localStorage with user-specific key
  useEffect(() => {
    if (!user) {
      setTransactions([]);
      return;
    }
    
    const userSpecificKey = `transactions_${user.id}`;
    const storedTransactions = localStorage.getItem(userSpecificKey);
    
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      setTransactions([]); // Reset when switching to a user with no transactions
    }
  }, [user]);

  // Save transactions to localStorage with user-specific key
  useEffect(() => {
    if (user) {
      const userSpecificKey = `transactions_${user.id}`;
      localStorage.setItem(userSpecificKey, JSON.stringify(transactions));
    }
  }, [transactions, user]);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    if (!user) {
      toast.error("Você precisa estar logado para adicionar transações.");
      return;
    }
    
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

  const getIncomeTotal = (month?: string) => {
    return transactions
      .filter((transaction) => {
        const isIncome = transaction.type === "income";
        if (!month) return isIncome;
        return isIncome && transaction.date.startsWith(month);
      })
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  const getExpenseTotal = (month?: string) => {
    return transactions
      .filter((transaction) => {
        const isExpense = transaction.type === "expense";
        if (!month) return isExpense;
        return isExpense && transaction.date.startsWith(month);
      })
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  const getBalance = (month?: string) => {
    return getIncomeTotal(month) - getExpenseTotal(month);
  };

  const getFilteredTransactions = (month?: string) => {
    if (!month) return transactions;
    return transactions.filter(transaction => transaction.date.startsWith(month));
  };

  const getTransactionsByMonth = () => {
    const monthsData: Record<string, { income: number; expense: number }> = {};
    
    transactions.forEach(transaction => {
      const month = transaction.date.substring(0, 7); // Format: YYYY-MM
      if (!monthsData[month]) {
        monthsData[month] = { income: 0, expense: 0 };
      }
      
      if (transaction.type === 'income') {
        monthsData[month].income += transaction.amount;
      } else {
        monthsData[month].expense += transaction.amount;
      }
    });
    
    // Sort months
    return Object.entries(monthsData)
      .sort(([monthA], [monthB]) => monthA.localeCompare(monthB))
      .map(([month, data]) => ({
        month,
        ...data
      }));
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
        selectedMonth,
        setSelectedMonth,
        getFilteredTransactions,
        getTransactionsByMonth
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
