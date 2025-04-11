
import { useState } from "react";
import { useTransactions } from "../contexts/TransactionContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Transaction } from "../types";
import { CalendarIcon, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Switch } from "./ui/switch";

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
  const [isCardPayment, setIsCardPayment] = useState(false);
  const [installments, setInstallments] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTransaction: Omit<Transaction, "id"> = {
      amount: parseFloat(amount),
      description,
      category,
      date: format(date, "yyyy-MM-dd"),
      type,
      ...(type === "expense" && isCardPayment && { installments: parseInt(installments) })
    };
    
    addTransaction(newTransaction);
    
    // Reset form
    setAmount("");
    setDescription("");
    setCategory("");
    setDate(new Date());
    setIsCardPayment(false);
    setInstallments("1");
  };

  return (
    <Card className="dark:bg-gray-800">
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
                <span className="text-gray-500 dark:text-gray-400">R$</span>
              </div>
              <Input
                id="amount"
                type="number"
                placeholder="0,00"
                className="pl-10 dark:bg-gray-700 dark:text-white"
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
              className="dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category" className="dark:bg-gray-700 dark:text-white">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800">
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

          {type === "expense" && (
            <div className="flex items-center space-x-2">
              <Switch 
                id="card-payment" 
                checked={isCardPayment}
                onCheckedChange={setIsCardPayment}
              />
              <Label htmlFor="card-payment" className="flex items-center gap-2">
                <CreditCard size={16} />
                Pagamento com cartão
              </Label>
            </div>
          )}

          {type === "expense" && isCardPayment && (
            <div className="space-y-2">
              <Label htmlFor="installments">Número de parcelas</Label>
              <Select value={installments} onValueChange={setInstallments}>
                <SelectTrigger id="installments" className="dark:bg-gray-700 dark:text-white">
                  <SelectValue placeholder="Selecione o número de parcelas" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}x {num > 1 ? "parcelas" : "parcela"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal dark:bg-gray-700",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 dark:bg-gray-800">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                  className="dark:bg-gray-800"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            variant={type === "income" ? "default" : "destructive"}
          >
            {type === "income" ? "Adicionar Entrada" : "Adicionar Saída"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
