import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import OrderContext from '../../context/OrderContext';


const GET_PRODUCT = gql`
   query getProduct{
getProduct{
      id  
name
stock
price
create
}
}
`;


const AssignProduct = () => {

    // state local del componente
    const [products, setProducts] = useState([]);

    // Context de pedidos
    const orderContext = useContext(OrderContext);
    const { AddProduct } = orderContext;


    // consulta a la base de datos
    const { data, loading, error } = useQuery(GET_PRODUCT);

    useEffect(() => {
        // TODO : Función para pasar a PedidoState.js
        AddProduct(products);
    }, [products])

    const selectProduct = product => {
        setProducts(product)
    }


    if (loading) return null;
    const { getProduct } = data;

    return (
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">2.-  search the products</p>
            <Select
                className="mt-3"
                options={getProduct}
                onChange={option => selectProduct(option)}
                isMulti={true}
                getOptionValue={option => option.id}
                getOptionLabel={option => `${option.name} - ${option.stock} Available`}
                placeholder="search product"
                noOptionsMessage={() => "We has not this product"}
                inputProps={{ min: 0 }}

            />

        </>
    );
}

export default AssignProduct;