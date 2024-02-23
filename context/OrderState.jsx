import React, { Children, useReducer } from "react";
// importamos el context creado
import OrderContext from "./OrderContext";
//importamos reducer
import OrderReducer from "./OrderReducer";

// importamos los type

import {
    SELECT_CLIENT,
    SELECT_PRODUCT,
    ACCOUNT_PRODUCTS
} from '../types/index'


const OrderState = () => {
    // state de pedido
    // creamos un objeto que se suele llamar siempre de la misma manera 
    //este contienen el state inicial de la aplicacion
    const initialState = {
        client: [],
        product: [],
        total: 0
    }

    // el state es el estado de la aplicacion es como se encuentra en ese momnento si se modifico algun punto de esta
    //el dispach usa los types de la carpeta 
    const [state, dispach] = useReducer(OrderReducer, initialState)


    return (
        <OrderContext.Provider
            value={{

            }}
        >
            {Children}
        </OrderContext.Provider>
    )
}
export default OrderState