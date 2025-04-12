
import { MobileSidebar } from "../components/MobileSidebar";
import { DashboardCharts } from "../components/DashboardCharts";
import { useTransactions } from "../contexts/TransactionContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { MonthSelector } from "@/components/MonthSelector";
import { MonthlyCharts } from "@/components/MonthlyCharts";

const Reports = () => {
  const { transactions, getIncomeTotal, getExpenseTotal, getBalance, selectedMonth } = useTransactions();

  // Calcular totais por categoria
  const categoryTotals = transactions
    .filter(transaction => transaction.date.startsWith(selectedMonth))
    .reduce((acc, transaction) => {
      const { category, amount, type } = transaction;
      if (!acc[category]) {
        acc[category] = { income: 0, expense: 0 };
      }
      if (type === "income") {
        acc[category].income += amount;
      } else {
        acc[category].expense += amount;
      }
      return acc;
    }, {} as Record<string, { income: number; expense: number }>);

  // Rótulos para as categorias
  const categoryLabels: Record<string, string> = {
    salary: "Salário",
    freelance: "Freelance",
    investments: "Investimentos",
    food: "Alimentação",
    housing: "Moradia",
    transport: "Transporte",
    health: "Saúde",
    leisure: "Lazer",
    education: "Educação",
    other: "Outros",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">
            Análise detalhada das suas finanças
          </p>
        </div>
        <MobileSidebar />
      </div>

      <div className="mb-6">
        <MonthSelector />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total de Entradas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-income">
              {formatCurrency(getIncomeTotal(selectedMonth))}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total de Saídas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-expense">
              {formatCurrency(getExpenseTotal(selectedMonth))}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${getBalance(selectedMonth) >= 0 ? "text-income" : "text-expense"}`}>
              {formatCurrency(getBalance(selectedMonth))}
            </p>
          </CardContent>
        </Card>
      </div>

      <DashboardCharts />

      {/* Monthly charts */}
      <MonthlyCharts />

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Resumo por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Categoria</th>
                  <th className="text-right py-2">Entradas</th>
                  <th className="text-right py-2">Saídas</th>
                  <th className="text-right py-2">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(categoryTotals).map(([category, { income, expense }]) => (
                  <tr key={category} className="border-b">
                    <td className="py-2">{categoryLabels[category] || category}</td>
                    <td className="text-right py-2 text-income">{formatCurrency(income)}</td>
                    <td className="text-right py-2 text-expense">{formatCurrency(expense)}</td>
                    <td className={`text-right py-2 ${income - expense >= 0 ? "text-income" : "text-expense"}`}>
                      {formatCurrency(income - expense)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
