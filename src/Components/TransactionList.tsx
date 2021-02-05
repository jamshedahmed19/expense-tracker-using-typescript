import {
  Card,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import {
  ITransaction,
  ITransactionState,
} from "../Interfaces/Transaction.interface";
import { RootState, useAppDispatch } from "../store/Store";
import { DELETE_TRANSACTION } from "../store/TransactionSlice";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

export interface TransactionListProps {}

const TransactionList: React.FC<TransactionListProps> = () => {
  const transactions = useSelector((state: RootState) => {
    console.log("transaction", state);
    return state.transactions.transactions.map((transaction) => transaction);
  });

  const displayChip = (type: string) => {
    if (type === "Income") {
      return (
        <Chip
          color="primary"
          variant="outlined"
          label="Income"
          icon={<SentimentVerySatisfiedIcon />}
        />
      );
    } else {
      return (
        <Chip
          color="secondary"
          variant="outlined"
          label="Expense"
          icon={<SentimentVeryDissatisfiedIcon />}
        />
      );
    }
  };
  const dispatch = useAppDispatch();
  return (
    <div>
      <List>
        {transactions &&
          transactions.map((transaction: ITransaction) => (
            <ListItem key={transaction.id} button divider>
              <ListItemText primary={transaction.title} />
              {displayChip(transaction.type)}
              <IconButton
                onClick={() => {
                  dispatch(DELETE_TRANSACTION(transaction.id));
                }}
              >
                <DeleteOutlined />
              </IconButton>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default TransactionList;
