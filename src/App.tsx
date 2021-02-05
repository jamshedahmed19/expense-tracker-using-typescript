import { Card } from "@material-ui/core";
import { Provider } from "react-redux";
import AddTransaction from "./Components/AddTransaction";
import IncomeExpense from "./Components/IncomeExpense";
import TransactionList from "./Components/TransactionList";
import { store } from "./store/Store";

function App() {
  return (
    <Provider store={store}>
      <IncomeExpense />
      <AddTransaction />
      <TransactionList />
    </Provider>
  );
}

export default App;
