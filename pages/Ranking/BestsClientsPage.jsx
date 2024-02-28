import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ResponsiveContainerProps } from 'recharts';


import { useQuery, gql } from '@apollo/client';

const BEST_CLIENTS = gql`
query getTopClients{
  getTopClients{
    total
    client {
        name,
      email
    } 
    
  }
}
`
const BestClients = () => {
    //startPolling y stopPolling llama a la base de dato para actualizar los datos 
    //start se usa para actualizar y stop para parar la actualizacion
    const { data, loading, error, startPolling, stopPolling } = useQuery(BEST_CLIENTS)


    useEffect(() => {
        // esto hace que si hay algo diferente en la bbdd te trae los resultados despues de un segundo
        //si no hay cambios en la bbdd no hara ninguna actualizacion 
        startPolling(1000)
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    if (loading) return
    const { getTopClients } = data
    const clientGrafic = []


    getTopClients.map((client, index) => {
        clientGrafic[index] = {
            ...client.client[0],
            total: client.total
        }
    })
    return (
        <Layout>
            <ResponsiveContainer className='mt-10  max-h-screen' height={700} width="100%" >
                <BarChart
                    width={500}
                    data={clientGrafic}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3182CE" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
            </ResponsiveContainer>
        </Layout>
    )
}
export default BestClients