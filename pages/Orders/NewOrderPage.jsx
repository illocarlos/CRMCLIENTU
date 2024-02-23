import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import AssignClient from '../../components/Order/AssignClient'
//context de pedido
import OrderContext from '../../context/OrderContext'
ç
const newOrder = () => {
    // utilizar context y extraer sus valores
    const orderContext = useContext(OrderContext)
    // y aqui llamamos la funcion que queremos usar o el valor para usar hacemos destructurin a la funcion en concreto p valor
    // por que podemos tener muchos 
    const { } = orderContext

    return (
        <Layout>

            <h1 className='text-2xl text-gray-800 font-light uppercase text-center' >
                new order
            </h1>
            <AssignClient />
        </Layout>
    )
}
export default newOrder