import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';

const NEW_PRODUCT = gql`
 mutation createProduct($input:ProductInput){
   createProduct(input:$input){
     id
  name
 stock
 price
   }
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



const NewProduct = () => {
    const [message, saveMessage] = useState(null)
    const router = useRouter()
    const [createProduct] = useMutation(NEW_PRODUCT, {
        //update actualiza algo en este caso puntamos el update al cahce y le pasamo data con el nuevo cliente  que es createClient

        update(cache, { data: { createProduct } }) {
            // Obtener el objeto del caché que quieres actualizar, en este caso es getClients
            const { getProduct } = cache.readQuery({ query: GET_PRODUCT });
            // Reescribir el caché (el caché nunca se debe modificar)
            // writeQuery reescribe el caché sin modificarlo, es decir, sin mutarlo
            cache.writeQuery({
                query: GET_PRODUCT,
                data: {
                    getProduct: [...getProduct, createProduct] // Agregar el nuevo cliente a la lista existente
                }
            });
        }
    });



    const formik = useFormik({
        initialValues: {
            name: '',
            stock: 0,
            price: 0,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('The name is required'),
            price: Yup.number().required('The price is required').min(1, 'min 1 decimal'),
            //primero validamos si existe o no contenido si tiene pasamos a la segunda validacion
            // esta validacion email valida si es de tipo email con sus nomenclatura si no la pasa envia el error 
            stock: Yup.number().required(' the stock is required').min(1, 'min 1 decimal'),

        }),
        onSubmit: async value => {

            try {
                const { data } = await createProduct({
                    //error el input solo no lo introduce bien y te genera undefined 
                    //en el programa de grapql el input es abrazado por otras llaves que no le di importancia 
                    //pero hay que declararla igualmente
                    variables: {
                        input: {
                            name: value.name,
                            price: value.price,
                            stock: value.stock,

                        }
                    }

                });
                Swal.fire({
                    position: "top-end",
                    width: "200",
                    icon: "success",
                    title: "Create client",
                    showConfirmButton: false,
                    timer: 1500
                });
                router.push('/Products/ProductPage')
            } catch (error) {
                saveMessage(error.message)
                console.log(error)

                setTimeout(() => {
                    saveMessage(null)
                }, 3000)
            }

        }

    })

    return (
        <Layout>

            <h2 className='text-2xl text-center text-gray-800 font-light'>
                new client
            </h2>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form className='bg-gray-800 shadow-md px-8 pt-6 pb-8 mb-4'
                        onSubmit={formik.handleSubmit}>

                        <div className='mb-4'>
                            <label className='block text-white text-center  text-sm font-bold mb-2' htmlFor='name'> Name</label>
                            <input
                                className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                id='name'
                                type='text'
                                placeholder='name client'
                                // manda el valor del formulario es decir lo conecta con formkit
                                value={formik.values.name}
                                // si no tiene el onchange no podras escribir en el formulario
                                onChange={formik.handleChange}
                                // se usa para validar el formulario si el usuario sale del campo en este caso de email
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div>
                                    <p className='mt-2 text-white bg-red-500 text-center rounded'>{formik.errors.name}</p>
                                </div>
                            ) : null}
                        </div>

                        <div className='mb-4'>
                            <label className='block text-white text-center  text-sm font-bold mb-2' htmlFor='price'> Price</label>
                            <input
                                className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                id='price'
                                type='number'
                                placeholder='Price of  product'
                                // manda el valor del formulario es decir lo conecta con formkit
                                value={formik.values.price}
                                // si no tiene el onchange no podras escribir en el formulario
                                onChange={formik.handleChange}
                                // se usa para validar el formulario si el usuario sale del campo en este caso de email
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.price && formik.errors.price ? (
                                <div>
                                    <p className='mt-2 text-white bg-red-500 text-center rounded'>{formik.errors.price}</p>
                                </div>
                            ) : null}
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white text-center text-sm font-bold mb-2' htmlFor='stock'> Stock</label>
                            <input
                                className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                id='stock'
                                type='number'
                                placeholder='stock of product'
                                // manda el valor del formulario es decir lo conecta con formkit
                                value={formik.values.stock}
                                // si no tiene el onchange no podras escribir en el formulario
                                onChange={formik.handleChange}
                                // se usa para validar el formulario si el usuario sale del campo en este caso de email
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.stock && formik.errors.stock ? (
                                <div>
                                    <p className='mt-2 text-white bg-red-500 text-center rounded'>{formik.errors.stock}</p>
                                </div>
                            ) : null}
                        </div>
                        <input type="submit"
                            className='text-white bg-gray-500 cursor-pointer rounded w-full mt-5 p-2  uppercase font-bold
                            hover:bg-gray-400 hover:text-black  duration-300'
                            value='Register client' />
                    </form>
                    {message ? (
                        <div className='bg-red-400 rounded-md text-white py-3 w-full my-3 text-center max-w-sm mx-auto'>
                            <p>{message}</p>
                        </div>
                    ) : null}
                </div>
            </div>
        </Layout>
    )
}
export default NewProduct