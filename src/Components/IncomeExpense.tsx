import { useSelector } from "react-redux";
import {
  ITransactionState,
  ITransaction,
} from "../Interfaces/Transaction.interface";
import { RootState } from "../store/Store";

export interface IncomeExpenseProps {}

const IncomeExpense: React.FC<IncomeExpenseProps> = () => {
  const transactions = useSelector((state: RootState) => {
    console.log("transaction", state);
    return state.transactions.transactions.map((transaction) => transaction);
  });

  const income = (transactions: ITransaction[]) => {
    const amount: number[] = transactions.map((transaction) => {
      return transaction.amount > 0 ? transaction.amount : 0;
    });
    return amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
  };
  const expense = (transactions: ITransaction[]) => {
    const amount: number[] = transactions.map((transaction) => {
      return transaction.amount < 0 ? transaction.amount : 0;
    });
    return amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
  };
  return (
    <div>
      <p>{income(transactions)}</p>
      <p>{expense(transactions)}</p>
    </div>
  );
};

export default IncomeExpense;
