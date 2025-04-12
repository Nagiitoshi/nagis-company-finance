
import { useTransactions } from "@/contexts/TransactionContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatCurrency } from "@/utils/formatCurrency";

export const MonthlyCharts = () => {
  const { getTransactionsByMonth } = useTransactions();
  const monthlyData = getTransactionsByMonth();
  
  // Format month labels and prepare data for charts
  const chartData = monthlyData.map(({ month, income, expense }) => {
    const date = parseISO(`${month}-01`);
    return {
      name: format(date, "MMM", { locale: ptBR }).toUpperCase(),
      income,
      expense,
      balance: income - expense,
    };
  });
  
  // Custom tooltip formatter
  const formatTooltipValue = (value: number) => {
    return formatCurrency(value);
  };
  
  return (
    <div className="grid gap-4 md:grid-cols-2 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Histórico Mensal</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={formatTooltipValue} />
              <Legend />
              <Bar dataKey="income" name="Receitas" fill="#059669" />
              <Bar dataKey="expense" name="Despesas" fill="#DC2626" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Evolução do Saldo</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={formatTooltipValue} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="balance" 
                name="Saldo" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }}
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
