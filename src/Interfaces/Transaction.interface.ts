export interface ITransaction {
    id?: string;
    title?: string;
    detail?: string;
    type: string;
    date?: Date;
    amount: number;
}