import { Paper, Typography } from "@material-ui/core";

export interface BalanceProps {}

const Balance: React.FC<BalanceProps> = () => {
  return (
    <Paper style={{ textAlign: "center" }}>
      <Typography variant="h6">Balance</Typography>
      <Typography variant="h6" color="primary">
        10000
      </Typography>
    </Paper>
  );
};

export default Balance;
