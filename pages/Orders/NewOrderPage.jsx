import React, { useContext, useState } from 'react'
import Layout from '../../components/Layout'
import AssignClient from '../../components/Order/AssignClient'
import AssignProduct from '../../components/Order/AssignProduct'
//context de pedido
import OrderContext from '../../context/OrderContext'
import SummaryOrder from '../../components/Order/SummaryOrder'
import Total from '../../components/Order/TotalPay'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client'

const NEW_ORDER = gql`
mutation createOrder($input:OrderInput){
createOrder(input:$input){
id


}

}
`;


const GET_ORDER = gql`
 query getOrdersPerSeller{
  getOrdersPerSeller {
    id
    order {
      id
      name,
      cuantity,
      price

    }
    total
    client{
      id
      name
      surnames 
      email
      phone
    }
    state
    create
    seller
  }
}
`

const NewOrder = () => {
    const router = useRouter();

    const [message, setMessage] = useState(null);
    // utilizar context y extraer sus valores
    const orderContext = useContext(OrderContext)
    const { client, products, total } = orderContext;
    // y aqui llamamos la funcion que queremos usar o el valor para usar hacemos destructurin a la funcion en concreto p valor
    // por que podemos tener muchos
    // const { } = orderContext

    // Mutation para crear un nuevo pedido
    const [createOrder] = useMutation(NEW_ORDER, {
        update(cache, { data: { createOrder } }) {
            const { getOrdersPerSeller } = cache.readQuery({ query: GET_ORDER });
            cache.writeQuery({
                query: GET_ORDER,
                data: {
                    getOrdersPerSeller: [...getOrdersPerSeller, createOrder]
                }
            })
        }
    });


    const ValidateOrder = () => {
        //.EVERY itera y deben tener todo los objeto que itere la misma condicion
        //revisa la condicion de todo los objetos y deben tenerlo todos

        return !products.every(product => product.cuantity > 0) || total === 0 || client.length === 0 ? " hidden " : "block";
    }



    const createNewOrder = async () => {

        const { id } = client

        const order = products.map(({ __typename, stock, create, ...product }) => product)


        try {
            const { data } = await createOrder({
                variables: {
                    input: {
                        client: id,
                        total,
                        order,
                    }
                }
            });


            // Redireccionar
            router.push('/Orders/OrdersPage');

            // Mostrar alerta
            Swal.fire(
                'OK',
                'Order register',
                'success'
            )
        } catch (error) {
            setMessage(error.message.replace('GraphQL error: ', ''));

            setTimeout(() => {
                setMessage(null)
            }, 3000);
        }
    }
    const ShowMessage = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto ">
                <p>{message} </p>
            </div>
        )
    }

    return (
        <Layout>

            <h1 className='text-2xl text-gray-800 font-light uppercase text-center' >
                new order
            </h1>
            {message && ShowMessage()}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AssignClient />
                    <AssignProduct />
                    <SummaryOrder />
                    <Total />


                    <button
                        type="button"
                        className={` bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${ValidateOrder()} `}
                        onClick={() => createNewOrder()}

                    >REGISTER ORDER</button>
                </div>
            </div>

        </Layout >
    )
}
export default NewOrder