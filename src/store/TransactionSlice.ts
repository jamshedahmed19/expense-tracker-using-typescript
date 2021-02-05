import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransaction } from "../Interfaces/Transaction.interface";

interface IinitialState {
  amount: number;
  type: "Income" | "Expense";
  error: string;
}

const initialState: IinitialState = {
  amount: 0,
  type: "Income",
  error: "",
};
export const transactionSlice = createSlice({
  name: "Transaction",
  initialState,
  reducers: {
    addTransaction: (state, { payload }: PayloadAction<ITransaction>) => {
      console.log("Payload", payload);
      if (payload.type === "Income") {
        state.amount = state.amount + payload.amount;
      } else if (payload.type === "Expense") {
        state.amount -= payload.amount;
      } else {
        initialState.error = `${payload.type} doesn't exist`;
      }
    },
  },
});

export default transactionSlice.reducer;

export const { addTransaction } = transactionSlice.actions;
