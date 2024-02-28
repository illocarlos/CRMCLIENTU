
import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2'
import client from '../Client';

const CHANGE_ORDER = gql`
   mutation updateOrder($id:ID!,$input:OrderInput){
updateOrder(id:$id,input:$input){
state
}
   }
`;
const DELETED_ORDER = gql`
mutation deletedOrder($id:ID!){
  deletedOrder(id:$id)

}
`

const GET_ORDER = gql`
query getOrdersPerSeller{
  getOrdersPerSeller {
    id
}
}
`

const Order = ({ order }) => {


    const { id, total, client: { name, surnames, email, phone }, state, seller } = order;

    // Mutation para cambiar el estado de un pedido
    const [updateOrder] = useMutation(CHANGE_ORDER)

    const [deletedOrder] = useMutation(DELETED_ORDER, {
        update(cache) {
            const { getOrdersPerSeller } = cache.readQuery({
                query: GET_ORDER
            });

            cache.writeQuery({
                query: GET_ORDER,
                data: {
                    getOrdersPerSeller: getOrdersPerSeller.filter(order => order.id !== id)
                }
            })
        }
    })

    // console.log(pedido)

    const [stateOrder, setStateOrder] = useState(state);
    const [classTipe, setClassTipe] = useState('');

    useEffect(() => {
        if (stateOrder) {
            setStateOrder(stateOrder)
        }
        classOrder();
    }, [stateOrder]);

    // Función que modifica el color del pedido de acuerdo a su estado
    const classOrder = () => {
        if (stateOrder === 'EARRING') {
            setClassTipe('border-yellow-500')
        } else if (stateOrder === 'COMPLETE') {
            setClassTipe('border-green-500')
        } else {
            setClassTipe('border-red-800')
        }
    }

    const changeStateOrder = async newState => {


        try {
            const { data } = await updateOrder({
                variables: {
                    id,
                    input: {
                        state: newState,
                        client: order.client.id
                    }
                }
            });

            setStateOrder(data.updateOrder.state);

        } catch (error) {
            console.log(error);
        }
    }

    const confirmDeleteOrder = () => {

        Swal.fire({
            title: 'Do you want to delete this order??',
            text: "This acction can,t undo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, deleted',
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.value) {
                try {
                    const data = await deletedOrder({
                        variables: {
                            id
                        }
                    });

                    Swal.fire(
                        'Deleted',
                        data.deletedOrder,
                        'success'
                    );


                } catch (error) {
                    console.log(error)
                }

            }
        })
    }
    return (
        <div className={` ${classTipe} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
            <div>
                <p className="font-bold text-gray-800">Client: {name} {surnames} </p>

                {email && (
                    <p className="flex items-center my-2">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        {email}
                    </p>
                )}

                {phone && (
                    <p className="flex items-center my-2">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        {phone}
                    </p>
                )}

                <h2 className="text-gray-800 font-bold mt-10">Order state:</h2>

                <select
                    className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold "
                    value={stateOrder}
                    onChange={e => changeStateOrder(e.target.value)}
                >
                    <option value="COMPLETE">COMPLETE</option>
                    <option value="EARRING">EARRING</option>
                    <option value="CANCEL">CANCEL</option>
                </select>
            </div>

            <div>
                <h2 className="text-gray-800 font-bold mt-2">Order summary</h2>
                {order.order.map(article => (
                    <div key={article.id} className="mt-4">
                        <p className="text-sm text-gray-600">Product: {article.name} </p>
                        <p className="text-sm text-gray-600">Cuantity: {article.cuantity} units</p>
                    </div>
                ))}

                <p className="text-gray-800 mt-3 font-bold ">Total pay:
                    <span className="font-light"> $ {total}</span>
                </p>

                <button
                    className="uppercase text-xs font-bold  flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight"
                    onClick={() => confirmDeleteOrder()}
                >
                    Deleted order

                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

                </button>
            </div>
        </div>
    );
}

export default Order;