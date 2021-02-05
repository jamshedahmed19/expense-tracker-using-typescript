import { Provider } from "react-redux";
import AddTransaction from "./Components/AddTransaction";
import { store } from "./store/Store";

function App() {
  return (
    <Provider store={store}>
      <AddTransaction />
    </Provider>
  );
}

export default App;
