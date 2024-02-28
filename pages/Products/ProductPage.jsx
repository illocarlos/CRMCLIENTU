import React from 'react'
import Layout from '../../components/Layout.jsx'
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
import Product from '../../components/Product.jsx';
import Loader from '../../components/Loader/Loader.jsx';

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

const GET_USER = gql`
query getUser{
getUser{

  id
}
}


`;


const ProductPage = () => {
    const { data: productData, loading: productLoading } = useQuery(GET_PRODUCT);
    const { data: productUser, loading } = useQuery(GET_USER);


    if (loading || productLoading) return <Loader />


    return (
        <Layout>
            <h2 className='text-2xl text-gray-800 font-bold text-center uppercase' >Products List</h2>

            {localStorage.Lid === "carlosalbendiz93@gmail.com" && (
                <Link href='/Products/NewProductPage'>
                    <p className='cursor-pointer text-sm uppercase font-bold rounded inline-block text-white bg-blue-800 py-2 px-5 mt-5 hover:bg-blue-500 duration-300'>new product</p>
                </Link>
            )}
            <table className='table-auto shadow-md mt-10 w-full w-lg'>
                <thead className='bg-gray-800'>
                    <tr className='text-white'>
                        <th className='w-2/5 py-2'>Name</th>
                        <th className='w-2/5 py-2'>Price</th>
                        <th className='w-1/5 py-2'>Stock</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {productData.getProduct.map(product => (
                        // le pasamos las propr al componente client 
                        <   Product
                            user={productUser.getUser.surnames}
                            key={product.id}
                            product={product}
                        />
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}
export default ProductPage