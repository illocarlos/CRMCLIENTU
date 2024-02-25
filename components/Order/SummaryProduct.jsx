
import React, { useContext, useState, useEffect } from 'react';
import OrderContext from '../../context/OrderContext';

const SummaryProduct = ({ product }) => {

    // Context de pedidos
    const orderContext = useContext(OrderContext);

    const { CuantityProduct, UpdateTotal } = orderContext;

    const [cuantity, setCuantity] = useState(0);

    useEffect(() => {
        UpdateCuantity();
        UpdateTotal();
    }, [cuantity])

    const UpdateCuantity = () => {
        const newProduct = { ...product, cuantity: Number(cuantity) }
        CuantityProduct(newProduct)
    }

    const { name, price } = product;

    return (
        <div className="md:flex md:justify-between md:items-center mt-5">
            <div className="md:w-2/4 mb-2 md:mb-0">
                <p className="text-sm">{name}</p>
                <p>$ {price}</p>
            </div>

            <input
                type="number"
                placeholder="Cantidad"
                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
                onChange={e => setCuantity(e.target.value)}
                value={cuantity}
                min="0"
            />
        </div>
    );
}

export default SummaryProduct;