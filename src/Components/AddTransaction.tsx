import { useState, forwardRef } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  ITransaction,
  ITransactionState,
  TransactionType,
} from "../Interfaces/Transaction.interface";
import { RootState, useAppDispatch } from "../store/Store";
import { ADD_TRANSACTION } from "../store/TransactionSlice";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import * as uuid from "uuid";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";

export interface AddTransactionProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddTransaction: React.FC<AddTransactionProps> = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const balance = useSelector((state: RootState) => {
    console.log("transaction", state);
    return state.transactions.transactions.map(
      (transaction) => transaction.amount
    );
  });
  const total = balance.reduce((acc, item) => (acc += item), 0).toFixed(2);
  let newDateTime = () => new Date();
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [detail, setDetail] = useState("Transaction Detail");
  const [title, setTitle] = useState("Transaction Title");

  const getTransactionType = (amount: number, type: string) => {
    return type === "Income" ? amount : -amount;
  };

  // const getEnum = (type: string): TransactionType => {
  //   return TransactionType[type as keyof typeof TransactionType];
  // };

  console.log(newDateTime().toISOString());
  const transaction = {
    id: uuid.v4(),
    title,
    detail,
    amount: getTransactionType(amount, type),
    type,
  };

  const disptach = useAppDispatch();

  return (
    <div>
      <Tooltip title="Add Transaction" aria-label="add">
        <IconButton color="primary" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              ADD TRANSACTION
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
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
            defaultValue=""
            value={type}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
              setType(e.target.value as string);
            }}
            helperText="Please select your currency"
            variant="outlined"
          >
            <MenuItem key={TransactionType.Income} value="Income">
              - Income
            </MenuItem>
            <MenuItem key={TransactionType.Expense} value="Expense">
              + Expense
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
      </Dialog>
    </div>
  );
};

export default AddTransaction;
