import React, { useContext } from 'react'
import OrderContext from '../../context/OrderContext.jsx';
import SummaryProduct from './SummaryProduct.jsx';

const SummaryOrder = () => {


    // Context de pedidos
    const orderContext = useContext(OrderContext);
    const { products } = orderContext;

    return (
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">3.-Adjust product quantities</p>

            {products.length > 0 ? (
                <>
                    {products.map(product => (
                        <SummaryProduct
                            key={product.id}
                            product={product}
                        />
                    ))}
                </>
            ) : (
                <p className="mt-5 text-sm"> you to have not product</p>
            )}
        </>
    );
}
export default SummaryOrder