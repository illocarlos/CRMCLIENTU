import React, { useState, useEffect } from 'react'

import Select from 'react-select'


const assignClient = () => {
    // creamos el array de productos como sera reactivo usamos useState
    //ira modificando a tiempo real si hay cambios product  es el array u setproduct es el mismo array pero modificado
    const [product, setProduct] = useState([])

    // con useefect podemos hace roperaciones cuando un valor cambia a tiempo real si product cambia se ejecuta las operaciones que tenga dentro
    //tambien se usa para realizar funciones una vez se monta ek componente en este caso hariamos las dos cosas como tal
    //es como watch y onmounted a la vez
    useEffect(() => {

        console.log(product)
    }, [product])

    const electProduct = product => {
        setProduct(product)
    }


    return (
        <>
            {/* componente selec dinamico y muy visual de react
            en el tiene sus propias props option le da las opciones podemos mandarse dichas props de la forma que se relfeja 
            isMulti -> es una vez elijas una prop se queda grabada en la etiqueta de select  y puedes usar como buscador 
            y puedes elegir mutliples en la option 
             onChange-> se usa para pasar el resultado a una funcion y hacer cambios o modificar
             noOptionsMessage-> si ecuando buscamos en el select no encontramos lo deseado aparecera el mensaje
            getOptionValue/getOptionLabel  */}
            <Select
                options={options}
                isMulti={true}
                onChange={option => electProduct()}
                getOptionValue={''}
                getOptionLabel={''}
                placeholder='Select a product'
                noOptionsMessage={'we has not this product'}
            />
        </>
    )
}
export default assignClient