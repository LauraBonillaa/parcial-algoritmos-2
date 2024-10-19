import ProductItem from "../components/ProductItem/ProductItem";
import { Actions } from "../types/store";


export const reducer = (currentAction: any, currentState: any) => {

const {action, payload} = currentAction

switch (action) {

        case Actions.GET_PRODUCTS:
        return {
            ...currentState,
            products: payload,
        };
		case Actions.ADD_TASK:

        return {
            ...currentState,
            tasks:[...currentState.tasks,payload]
        }
        
        case Actions.REMOVE_TASK:

        return {
            ...currentState,
            products:currentState.products.filter((product: ProductItem)=> product.id !== payload)
        }

    default:
        return currentState;
}
}