
export type User = {
  id: string;
  name: string;
  email: string;
};

export type Transaction = {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  type: "income" | "expense";
  installments?: number; // Added for card installments feature
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  deleteAccount: () => void; // Added for account deletion
  isAuthenticated: boolean;
};

export type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  getIncomeTotal: (month?: string) => number;
  getExpenseTotal: (month?: string) => number;
  getBalance: (month?: string) => number;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  getFilteredTransactions: (month?: string) => Transaction[];
  getTransactionsByMonth: () => Array<{
    month: string;
    income: number;
    expense: number;
  }>;
};
