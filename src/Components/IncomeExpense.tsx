import { useSelector } from "react-redux";
import {
  ITransactionState,
  ITransaction,
} from "../Interfaces/Transaction.interface";
import { RootState } from "../store/Store";
import { Grid, Paper, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export interface IncomeExpenseProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      textAlign: "center",
    },
    success: {
      color: "#00a152",
    },
  })
);

const IncomeExpense: React.FC<IncomeExpenseProps> = () => {
  const classes = useStyles();

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
    <Grid container item>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography variant="h6">Income</Typography>
          <Typography className={classes.success} variant="h6">
            {income(transactions)}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography variant="h6">Expense</Typography>
          <Typography variant="h6" color="secondary">
            {expense(transactions)}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default IncomeExpense;
