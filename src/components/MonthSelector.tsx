
import { useTransactions } from "@/contexts/TransactionContext";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export const MonthSelector = () => {
  const { selectedMonth, setSelectedMonth } = useTransactions();
  const [monthLabel, setMonthLabel] = useState("");
  
  useEffect(() => {
    // Format the selected month for display
    if (selectedMonth) {
      const date = parseISO(`${selectedMonth}-01`);
      const formattedMonth = format(date, "MMMM yyyy", { locale: ptBR });
      setMonthLabel(formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1));
    }
  }, [selectedMonth]);
  
  const handlePreviousMonth = () => {
    const [year, month] = selectedMonth.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 2);
    setSelectedMonth(format(date, "yyyy-MM"));
  };
  
  const handleNextMonth = () => {
    const [year, month] = selectedMonth.split("-");
    const date = new Date(parseInt(year), parseInt(month));
    setSelectedMonth(format(date, "yyyy-MM"));
  };
  
  const handleCurrentMonth = () => {
    setSelectedMonth(format(new Date(), "yyyy-MM"));
  };
  
  return (
    <div className="flex items-center justify-between p-2 rounded-md bg-muted">
      <Button variant="ghost" size="sm" onClick={handlePreviousMonth}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button variant="ghost" size="sm" className="font-semibold" onClick={handleCurrentMonth}>
        {monthLabel}
      </Button>
      
      <Button variant="ghost" size="sm" onClick={handleNextMonth}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
