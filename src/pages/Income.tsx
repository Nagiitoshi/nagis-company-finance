
import { TransactionForm } from "../components/TransactionForm";
import { TransactionList } from "../components/TransactionList";
import { MobileSidebar } from "../components/MobileSidebar";

const Income = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Entradas</h1>
          <p className="text-muted-foreground">
            Gerencie suas receitas e ganhos
          </p>
        </div>
        <MobileSidebar />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TransactionForm type="income" />
        <TransactionList type="income" />
      </div>
    </div>
  );
};

export default Income;
