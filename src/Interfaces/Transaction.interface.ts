export interface ITransaction {
  id?: string;
  title?: string;
  detail?: string;
  type: string;
  amount: number;
}

export interface ITransactionState {
  transactions: ITransaction[];
}

export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";
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
