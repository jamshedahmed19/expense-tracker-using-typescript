import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Card,
  Grid,
  GridListTileBar,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Provider } from "react-redux";
import AddTransaction from "./Components/AddTransaction";
import IncomeExpense from "./Components/IncomeExpense";
import TransactionList from "./Components/TransactionList";
//import AppBottomNavigation from "./Components/AppBottomNavigation";
import { store } from "./store/Store";
import Balance from "./Components/Balance";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      fontWeight: 300,
    },
  })
);

function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Expense Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={8} lg={4}>
          <Balance />
        </Grid>
        <Grid item xs={8} lg={4}>
          <IncomeExpense />
        </Grid>
        <Grid item xs={10} lg={8}>
          <TransactionList />
        </Grid>
      </Grid>
      <AddTransaction />
      {/* <AppBottomNavigation /> */}
    </Provider>
  );
}

export default App;
