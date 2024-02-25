
import {
    SELECT_CLIENT,
    SELECT_PRODUCT,
    ACCOUNT_PRODUCTS,
    UPDATE_TOTAL
} from '../types/index'

const OrderReducer = (state, action) => {
    // esto es lo que se conecta en el state por cada caso 
    // le pasaremos un type de varios componentes el que se asemeja al case entrara y retornara lo que tenga
    //action.type es lo que le pasamos que tenemos en el archivo type/index pero vendra de orderSTATE  o de otro state
    //
    switch (action.type) {
        // si el case es igual al action.type que le pasamos pasaremos a ese case
        case SELECT_CLIENT:
            return {
                ...state,
                client: action.payload
            }
        case SELECT_PRODUCT:
            return {
                ...state,
                products: action.payload
            }
        case ACCOUNT_PRODUCTS:
            return {
                ...state,
                products: state.products.map(product => product.id === action.payload.id ? product = action.payload : product)
            }
        case UPDATE_TOTAL:

            const totalFormated = state.products.reduce((newTotal, art) => newTotal += art.price * art.cuantity, 0)

            if (totalFormated <= 0) {
                totalFormated = 0
            }

            return {
                ...state,
                total: totalFormated.toFixed(2)
            }

        default:
            return state
    }
}


export default OrderReducer