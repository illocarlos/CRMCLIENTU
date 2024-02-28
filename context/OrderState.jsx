import React, { useReducer } from "react";
// importamos el context creado
import OrderContext from "./OrderContext";
//importamos reducer
import OrderReducer from "./OrderReducer";

// importamos los type

import {
    SELECT_CLIENT,
    SELECT_PRODUCT,
    ACCOUNT_PRODUCTS,
    UPDATE_TOTAL
} from '../types/index'


const OrderState = ({ children }) => {

    // state de pedido
    // creamos un objeto que se suele llamar siempre de la misma manera 
    //este contienen el state inicial de la aplicacion
    const initialState = {
        client: {},
        products: [],
        total: 0
    }

    // el state es el estado de la aplicacion es como se encuentra en ese momnento si se modifico algun punto de esta
    //el dispach usa los types de la carpeta 
    const [state, dispatch] = useReducer(OrderReducer, initialState)


    // esto lo mandamos a rducer y filtamos con el switch que tenemos alli  y ajustamos tendremos un type en reducer igual al de aqui
    // por lo tanto entrara  y na vez entre haremos la action que tengamos alli
    const AddClient = client => {
        dispatch({
            type: SELECT_CLIENT,
            payload: client
        })
    }
    // Modifica los productos
    const AddProduct = productSelect => {

        let newState;
        if (state.products.length > 0) {
            // Tomar del segundo arreglo, una copia para asignarlo al primero
            newState = productSelect.map(product => {
                const newObject = state.products.find(productState => productState.id === product.id);
                return { ...product, ...newObject }
            })
        } else {
            newState = productSelect;
        }

        dispatch({
            type: SELECT_PRODUCT,
            payload: newState
        })
    }


    // Modifica las cantidades de los productos
    const CuantityProduct = newProduct => {
        dispatch({
            type: ACCOUNT_PRODUCTS,
            payload: newProduct
        })
    }

    const UpdateTotal = () => {
        dispatch({
            type: UPDATE_TOTAL
        })
    }

    return (
        <OrderContext.Provider
            value={{
                client: state.client,
                products: state.products,
                total: state.total,
                AddClient,
                AddProduct,
                CuantityProduct,
                UpdateTotal
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}
export default OrderState