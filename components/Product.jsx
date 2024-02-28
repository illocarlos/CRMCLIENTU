import React from 'react';
import Swal from 'sweetalert2';
import { useMutation, gql } from '@apollo/client';
import Deleted from './ButtonsComponent/Deleted';
import Edit from './ButtonsComponent/Edit';
import Router from 'next/router';

const DELETED_PRODUCT = gql`
  mutation deletedProduct($id: ID!) {
    deletedProduct(id: $id)
  }
`;

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

const Product = ({ product }) => {

    const [deletedProduct] = useMutation(DELETED_PRODUCT, {
        update(cache) {
            const { getProduct } = cache.readQuery({ query: GET_PRODUCT });
            cache.writeQuery({
                query: GET_PRODUCT,
                data: {
                    getProduct: getProduct.filter(eachProduct => eachProduct.id !== id)
                }
            });
        }
    });

    const { id, name, stock, price } = product;

    const deleteThisProduct = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await deletedProduct({
                        variables: {
                            id
                        }
                    });
                    Swal.fire({
                        position: "top-end",
                        width: "200",
                        title: "Deleted!",
                        text: "Your product has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your product has been deleted.",
                        icon: "error"
                    });
                }
            }
        });
    };
    const editProduct = () => {
        // con este ROUTER podemos mandar a donde queramos pasandole informacion 
        Router.push({
            pathname: "/Products/EditProductPage/[id]",
            query: { id }
        })
    }
    return (
        <tr>
            <td className='border px-4 py-2 text-center'>{name}</td>
            <td className='border px-4 py-2 text-center'>{price}$</td>
            <td className='border px-4 py-2 text-center'>{stock}</td>

            {localStorage.Lid === "carlosalbendiz93@gmail.com" && (
                <td className='mx-2 '>
                    <button
                        onClick={() => editProduct(id)}
                        type='button'
                        className=' flex justify-center items-center'>
                        <Edit />
                    </button>
                </td>
            )}

            {localStorage.Lid === "carlosalbendiz93@gmail.com" && (
                <td className='mx-2 '>
                    <button
                        onClick={() => deleteThisProduct(id)}
                        type='button'
                        className='  ml-5 flex justify-center items-center'>
                        <Deleted />
                    </button>
                </td>
            )}

        </tr>
    );
};

export default Product;
