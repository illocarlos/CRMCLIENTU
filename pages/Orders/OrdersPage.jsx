import React from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'


const Orders = () => {
    return (
        <Layout>
            <h2 className='text-2xl text-gray-800 font-light' >Orders</h2>
            <Link href={'/Orders/NewOrderPage'} >
                <p className='cursor-pointer text-sm uppercase font-bold rounded inline-block text-white bg-blue-800 py-2 px-5 mt-5 hover:bg-blue-500 duration-300 '>new order</p>
            </Link>
        </Layout>
    )
}
export default Orders