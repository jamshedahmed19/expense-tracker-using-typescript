import { Button, MenuItem, TextField } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  ITransaction,
  TransactionType,
} from "../Interfaces/Transaction.interface";
import { RootState, useAppDispatch } from "../store/Store";
import { ADD_TRANSACTION } from "../store/TransactionSlice";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import * as uuid from "uuid";

export interface AddTransactionProps {}

const AddTransaction: React.FC<AddTransactionProps> = () => {
  const balance = useSelector((state: RootState) => {
    console.log("transaction", state.transaction.transactions);
    return state.transaction.transactions.map(
      (transaction: ITransaction) => transaction.amount
    );
  });
  const total = balance.reduce((acc, item) => (acc += item), 0).toFixed(2);
  let newDateTime = () => new Date();
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("Income");
  const [detail, setDetail] = useState("Transaction Detail");
  const [title, setTitle] = useState("Transaction Title");
  //const [date, setDate] = useState(newDateTime().toISOString());
  const [date, setDate] = useState<Date>(new Date());

  const getTransactionType = (amount: number, type: TransactionType) => {
    return type === TransactionType.Income ? amount : -amount;
  };

  const getEnum = (type: string): TransactionType => {
    return TransactionType[type as keyof typeof TransactionType];
  };
  // const handleDateChange = (date: Date | null) => {
  //   setSelectedDate(date);
  // };
  console.log(newDateTime().toISOString());
  const transaction = {
    id: uuid.v4(),
    title,
    detail,
    amount: getTransactionType(amount, getEnum(type)),
    type,
  };

  const disptach = useAppDispatch();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          disptach(ADD_TRANSACTION(transaction));
        }}
      >
        <p>{total}</p>
        <TextField
          id="outlined-number"
          size="small"
          label="Transaction Title"
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-number"
          size="small"
          label="Amount"
          type="number"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Transaction Detail"
          size="small"
          multiline
          rowsMax={4}
          onChange={(e) => {
            setDetail(e.target.value);
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-select-currency"
          select
          size="small"
          label="Transaction Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          helperText="Please select your currency"
          variant="outlined"
        >
          <MenuItem key="+" value={TransactionType.Income}>
            + Income
          </MenuItem>
          <MenuItem key="-" value={TransactionType.Expense}>
            - Expense
          </MenuItem>
        </TextField>
        {/* <TextField
          id="date-picker-inline"
          label="Date picker inline"
          size="small"
          value={date}
          variant="outlined"
          onChange={() => setDate(new Date())}
        />
        <select
          name="transaction-type"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select> */}
        {/* <button type="submit">Add Transaction</button> */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<AddCircleOutlineIcon />}
        >
          ADD TRANSACTION
        </Button>
      </form>
    </div>
  );
};

export default AddTransaction;
