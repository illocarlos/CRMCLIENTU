import React from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'
import Order from '../../components/Order/Order.jsx';
import { gql, useQuery } from '@apollo/client';

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

const Orders = () => {

  const { data, loading, error } = useQuery(GET_ORDER);

  if (loading) return 'loading...';

  const { getOrdersPerSeller } = data;

  return (
    <Layout>
      <h2 className='text-2xl text-gray-800 font-light' >Orders</h2>
      <Link href={'/Orders/NewOrderPage'} >
        <p className='cursor-pointer text-sm uppercase font-bold rounded inline-block text-white bg-blue-800 py-2 px-5 mt-5 hover:bg-blue-500 duration-300 '>new order</p>
      </Link>
      {getOrdersPerSeller.length === 0 ? (
        <p className="mt-5 text-center text-2xl">No order</p>
      ) : (
        getOrdersPerSeller.map(order => (
          <Order
            key={order.id}
            order={order}
          />
        ))
      )}
    </Layout>
  )
}
export default Orders