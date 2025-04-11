
import { TransactionForm } from "../components/TransactionForm";
import { TransactionList } from "../components/TransactionList";
import { MobileSidebar } from "../components/MobileSidebar";

const Expense = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Saídas</h1>
          <p className="text-muted-foreground">
            Gerencie suas despesas e gastos
          </p>
        </div>
        <MobileSidebar />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TransactionForm type="expense" />
        <TransactionList type="expense" />
      </div>
    </div>
  );
};

export default Expense;
