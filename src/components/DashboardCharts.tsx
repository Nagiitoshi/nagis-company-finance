
import { useTransactions } from "../contexts/TransactionContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { formatCurrency } from "../utils/formatCurrency";
import { Transaction } from "../types";

// Cores para os gráficos
const COLORS = ["#059669", "#DC2626", "#EAAC8B", "#E5989B", "#B5838D", "#6D6875"];

// Função para agrupar transações por categoria
const groupByCategory = (transactions: Transaction[], type: "income" | "expense") => {
  const filtered = transactions.filter(t => t.type === type);
  
  return filtered.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {} as Record<string, number>);
};

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

export const DashboardCharts = () => {
  const { transactions, getIncomeTotal, getExpenseTotal } = useTransactions();
  
  // Dados para o gráfico de pizza (distribuição de receitas e despesas)
  const pieData = [
    { name: "Entradas", value: getIncomeTotal() },
    { name: "Saídas", value: getExpenseTotal() },
  ];

  // Agrupar transações por categoria
  const incomeByCategory = groupByCategory(transactions, "income");
  const expenseByCategory = groupByCategory(transactions, "expense");

  // Preparar dados para os gráficos de barra
  const incomeData = Object.entries(incomeByCategory).map(([category, amount]) => ({
    name: categoryLabels[category] || category,
    value: amount,
    type: "income"
  }));

  const expenseData = Object.entries(expenseByCategory).map(([category, amount]) => ({
    name: categoryLabels[category] || category,
    value: amount,
    type: "expense"
  }));

  // Formatar valor nos tooltips
  const formatTooltipValue = (value: number) => formatCurrency(value);

  return (
    <div className="grid gap-4 md:grid-cols-2 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Visão Geral</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name }) => name}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? COLORS[0] : COLORS[1]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={formatTooltipValue} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Por Categorias</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[...incomeData, ...expenseData]}
              layout="vertical"
              barSize={20}
              barGap={0}
            >
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip formatter={formatTooltipValue} />
              <Bar
                dataKey="value"
                fill="#8884d8"
                stroke="#8884d8"
                fillOpacity={0.6}
                strokeOpacity={0.8}
                name="Valor"
                isAnimationActive={true}
              >
                {[...incomeData, ...expenseData].map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.type === "income" ? COLORS[0] : COLORS[1]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
