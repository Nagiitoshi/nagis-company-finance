
import { useTransactions } from "../contexts/TransactionContext";
import { formatCurrency } from "../utils/formatCurrency";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDownIcon, ArrowUpIcon, WalletIcon } from "lucide-react";

export const DashboardCards = () => {
  const { getBalance, getIncomeTotal, getExpenseTotal } = useTransactions();

  const balance = getBalance();
  const income = getIncomeTotal();
  const expense = getExpenseTotal();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
          <WalletIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${balance >= 0 ? "text-income" : "text-expense"}`}>
            {formatCurrency(balance)}
          </div>
          <p className="text-xs text-muted-foreground">
            Seu saldo atual
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Entradas</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-income" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-income">{formatCurrency(income)}</div>
          <p className="text-xs text-muted-foreground">
            Total de receitas
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Saídas</CardTitle>
          <ArrowDownIcon className="h-4 w-4 text-expense" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-expense">{formatCurrency(expense)}</div>
          <p className="text-xs text-muted-foreground">
            Total de despesas
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
