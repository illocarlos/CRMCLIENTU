import React, { useContext } from 'react';
import OrderContext from '../../context/OrderContext';

const Total = () => {

    // Context de pedidos
    const orderContext = useContext(OrderContext);
    const { total } = orderContext;

    return (
        <div className="flex items-center mt-5 justify-between border-solid border-2 bg-gray-300 p-3 border-gray-400 ">
            <h2 className="text-gray-800 text-lg">Total pay: </h2>
            <p className="text-gray-800 mt-0 ">$ {total}</p>
        </div>
    );
}

export default Total;