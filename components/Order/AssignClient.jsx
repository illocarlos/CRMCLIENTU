import React, { useState, useEffect, useContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import Select from 'react-select'
import OrderContext from '../../context/OrderContext'
import Loader from '../Loader/Loader';

const GET_CLIENTS_SELLER = gql`
query getClientsSeller{
   getClientsSeller{
    id
    name
    surnames
    email
    company
  }
}
    `;

const AssingClient = () => {
    // creamos el array de productos como sera reactivo usamos useState
    //ira modificando a tiempo real si hay cambios product  es el array u setproduct es el mismo array pero modificado
    const [client, setClient] = useState([])
    // contex de pedido
    const orderContext = useContext(OrderContext)
    const { AddClient } = orderContext
    // copnsulta bbdd
    const { data, loading, error } = useQuery(GET_CLIENTS_SELLER)

    // con useefect podemos hace roperaciones cuando un valor cambia a tiempo real si product cambia se ejecuta las operaciones que tenga dentro
    //tambien se usa para realizar funciones una vez se monta ek componente en este caso hariamos las dos cosas como tal
    //es como watch y onmounted a la vez
    useEffect(() => {

        AddClient(client)
    }, [client])

    const selectProduct = clients => {
        setClient(clients)
    }
    //resultado de consulta
    if (loading) return <div className='w-sceen h-screen flex justify-center items-center content-center'><Loader /></div>
    const { getClientsSeller } = data
    return (
        <>
            {/* componente selec dinamico y muy visual de react
            en el tiene sus propias props option le da las opciones podemos mandarse dichas props de la forma que se relfeja 
            isMulti -> es una vez elijas una prop se queda grabada en la etiqueta de select  y puedes usar como buscador 
            y puedes elegir mutliples en la option 
             onChange-> se usa para pasar el resultado a una funcion y hacer cambios o modificar
             noOptionsMessage-> si ecuando buscamos en el select no encontramos lo deseado aparecera el mensaje
            getOptionValue/getOptionLabel  */}
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1.-  select a client</p>

            <Select
                className='mt-3 '
                options={getClientsSeller}
                onChange={option => selectProduct(option)}
                getOptionValue={option => option.id}
                getOptionLabel={option => option.name}
                placeholder='Select a product'
                noOptionsMessage={'we has not this client'}
            />
        </>
    )
}
export default AssingClient