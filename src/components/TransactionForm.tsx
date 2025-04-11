
import { useState } from "react";
import { useTransactions } from "../contexts/TransactionContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Transaction } from "../types";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const categories = {
  income: [
    { value: "salary", label: "Salário" },
    { value: "freelance", label: "Freelance" },
    { value: "investments", label: "Investimentos" },
    { value: "other", label: "Outros" },
  ],
  expense: [
    { value: "food", label: "Alimentação" },
    { value: "housing", label: "Moradia" },
    { value: "transport", label: "Transporte" },
    { value: "health", label: "Saúde" },
    { value: "leisure", label: "Lazer" },
    { value: "education", label: "Educação" },
    { value: "other", label: "Outros" },
  ],
};

interface TransactionFormProps {
  type: "income" | "expense";
}

export const TransactionForm = ({ type }: TransactionFormProps) => {
  const { addTransaction } = useTransactions();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTransaction: Omit<Transaction, "id"> = {
      amount: parseFloat(amount),
      description,
      category,
      date: format(date, "yyyy-MM-dd"),
      type,
    };
    
    addTransaction(newTransaction);
    
    // Reset form
    setAmount("");
    setDescription("");
    setCategory("");
    setDate(new Date());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn(
          "text-xl",
          type === "income" ? "text-income" : "text-expense"
        )}>
          {type === "income" ? "Nova Entrada" : "Nova Saída"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">R$</span>
              </div>
              <Input
                id="amount"
                type="number"
                placeholder="0,00"
                className="pl-10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="0.01"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Descrição da transação"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {type === "income"
                  ? categories.income.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))
                  : categories.expense.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button type="submit" className="w-full" variant={type === "income" ? "default" : "destructive"}>
            {type === "income" ? "Adicionar Entrada" : "Adicionar Saída"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
