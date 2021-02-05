import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAddTransactionAction,
  ITransaction,
  ITransactionState,
} from "../Interfaces/Transaction.interface";

const initialState: ITransactionState = {
  transactions: [
    {
      id: "111111",
      title: "Test",
      detail: "",
      type: "Income",
      amount: 200000,
    },
  ],
};
export const transactionSlice = createSlice({
  name: "Transaction",
  initialState,
  reducers: {
    ADD_TRANSACTION: (state, {payload}: PayloadAction<ITransaction>) => {
      return {
        ...state,
        transactions: [payload, ...state.transactions],
      };
    },
    DELETE_TRANSACTION: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== payload
        ),
      };
    },
  },
});

export default transactionSlice.reducer;

export const { ADD_TRANSACTION, DELETE_TRANSACTION } = transactionSlice.actions;
