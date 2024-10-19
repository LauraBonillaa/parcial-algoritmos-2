import { getProducts } from "../services/getproducts"
import { ProductItem } from "../types/product"
import { Actions } from "../types/store";



export const getProductsState = async () => {
    const data = await getProducts()
    return {
        action: Actions.GET_PRODUCTS,
        payload: data,
    };
};

export const addTask=(payload: ProductItem) => {
    return {
        action: Actions.ADD_TASK,
        payload
    }
    
}
export const removeTask=(payload: number) => {
    return {
        action: Actions.REMOVE_TASK,
        payload
    }
    
}