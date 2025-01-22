import { TableEntity } from '@azure/data-tables';

export type Emit = (message: string) => void;

export interface Product extends TableEntity {
    name: string;
    quantity: number;
    price: number;
    clearance: boolean;
}