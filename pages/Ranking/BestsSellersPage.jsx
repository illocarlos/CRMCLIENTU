import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


import { useQuery, gql } from '@apollo/client';

const BEST_SELLERS = gql`
query getTopSellers{
  getTopSellers{

    seller {
      name,
      email

    }
    total
  }
}
`
const BestSellers = () => {
    //startPolling y stopPolling llama a la base de dato para actualizar los datos 
    //start se usa para actualizar y stop para parar la actualizacion
    const { data, loading, error, startPolling, stopPolling } = useQuery(BEST_SELLERS)


    useEffect(() => {
        // esto hace que si hay algo diferente en la bbdd te trae los resultados despues de un segundo
        //si no hay cambios en la bbdd no hara ninguna actualizacion 
        startPolling(1000)
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    if (loading) return
    const { getTopSellers } = data
    const sellerGrafic = []


    getTopSellers.map((seller, index) => {
        sellerGrafic[index] = {
            ...seller.seller[0],
            total: seller.total
        }
    })
    return (
        <Layout>
            <h2 className='text-center uppercase font-bold' >top sellers</h2>
            <ResponsiveContainer className='mt-10 max-h-screen' height={700} width="100%" >
                <BarChart
                    width={500}
                    data={sellerGrafic}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3182CE" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
            </ResponsiveContainer>
        </Layout>
    )
}
export default BestSellers