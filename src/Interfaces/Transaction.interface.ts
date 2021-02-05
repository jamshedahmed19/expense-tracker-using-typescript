export interface ITransaction {
  id: string;
  title?: string;
  detail?: string;
  type: string;
  amount: number;
}

export interface ITransactionState {
  transactions: ITransaction[];
}

const ADD_TRANSACTION = "ADD_TRANSACTION";
const DELETE_TRANSACTION = "DELETE_TRANSACTION";
export interface IAddTransactionAction {
  type: typeof ADD_TRANSACTION;
  payload: ITransaction;
}
export interface IDeleteTransactionAction {
  type: typeof DELETE_TRANSACTION;
  payload: string;
}

export enum TransactionType {
  Income,
  Expense,
}

export type TransactionActionTypes =
  | IAddTransactionAction
  | IDeleteTransactionAction;
