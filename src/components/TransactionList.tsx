
import { useTransactions } from "../contexts/TransactionContext";
import { formatCurrency } from "../utils/formatCurrency";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "./ui/button";
import { CreditCard, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Transaction } from "@/types";
import { MonthSelector } from "./MonthSelector";

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

interface TransactionListProps {
  type: "income" | "expense";
}

export const TransactionList = ({ type }: TransactionListProps) => {
  const { transactions, deleteTransaction, selectedMonth } = useTransactions();

  const filteredTransactions = transactions.filter(
    (transaction) => 
      transaction.type === type && 
      transaction.date.startsWith(selectedMonth)
  );

  if (filteredTransactions.length === 0) {
    return (
      <Card className="mt-6 dark:bg-gray-800 dark:text-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">
            {type === "income" ? "Entradas Recentes" : "Saídas Recentes"}
          </CardTitle>
          <MonthSelector />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Nenhuma {type === "income" ? "entrada" : "saída"} registrada para este mês.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">
          {type === "income" ? "Entradas Recentes" : "Saídas Recentes"}
        </CardTitle>
        <MonthSelector />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                {type === "expense" && <TableHead>Parcelas</TableHead>}
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell>
                    {format(parseISO(transaction.date), "dd/MM/yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {categoryLabels[transaction.category] || transaction.category}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    transaction.type === "income" ? "text-income" : "text-expense"
                  }`}>
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  {type === "expense" && (
                    <TableCell>
                      {transaction.installments && transaction.installments > 1 ? (
                        <div className="flex items-center gap-1">
                          <CreditCard className="h-3 w-3" />
                          <span>{transaction.installments}x</span>
                        </div>
                      ) : (
                        <span>-</span>
                      )}
                    </TableCell>
                  )}
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTransaction(transaction.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
