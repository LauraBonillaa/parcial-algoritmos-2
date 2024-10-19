import  ProductItem  from "../components/ProductItem/ProductItem";

export type AppState = {
    screen: string,
    
    products: ProductItem[];
};

export type Observer = { render: () => void } & HTMLElement;

export enum Actions {
   GET_PRODUCTS = 'GET_PRODUCTS',
   ADD_TASK = 'ADD_TASK',
   REMOVE_TASK = 'REMOVE_TASK',
};