
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
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

export type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  getIncomeTotal: () => number;
  getExpenseTotal: () => number;
  getBalance: () => number;
};
