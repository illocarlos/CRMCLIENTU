import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout';
import { useQuery, gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import * as Yup from 'yup'
import { Formik } from 'formik';

const GET_PRODUCT_ID = gql`
 query getProductId($id:ID!){
getProductId(id:$id){
  id 
  name
  stock
    price
}
}
`;

const UPDATE_PRODUCT = gql`
mutation updateProduct($id:ID!,$input:ProductInput){
updateProduct(id:$id,input:$input){
  id
  name
  stock
  price
}
}
`

const editProdut = () => {
    // obtener id actual
    const router = useRouter();

    const { query } = router; // Extraer el id de la ruta
    const id = query.pid


    // traer ese cliente cliente
    const { data, loading } = useQuery(GET_PRODUCT_ID, {
        variables: { id }
    });

    //actualizar cliente 
    const [updateProduct] = useMutation(UPDATE_PRODUCT)




    // schema de validacion que le pasamos al componente formkit con una props especial
    const schemaValidation = Yup.object({
        name: Yup.string().required('The name is required'),
        price: Yup.number()
            .required('The prices is required')
            .positive('required number positive ')
            .min(1, 'min 1 decimal'),
        stock: Yup.number()
            .required('stock is required')
            .positive('required number positive ')
            .integer('required number integred')
            .min(1, 'min 1 decimal')
    })


    if (loading) return null

    // esta abrazado por un objeto hay que declararo abrazado con llaves 
    const { getProductId } = data


    const updateProductNow = async values => {
        const { name, price, stock } = values

        try {
            const { data } = await updateProduct({
                variables: {
                    id,
                    input: {
                        name,
                        price,
                        stock,

                    }
                }

            });

            //mensaje de exito al editar
            Swal.fire({
                position: "top-end",
                width: "200",
                icon: "success",
                title: " Edit product",
                showConfirmButton: false,
                timer: 1500
            });
            // redirigimos a index si se actualiza
            router.push('/Products/ProductPage')
        } catch (error) {
            console.log(error)
        }


    }

    return (

        <Layout>
            <h1>Edit product</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>

                    {/* este es un componente de formik para poder editar ademas tiene una serie de props que le pasamos 
                    anteriormente para crear por ejemplo a submit value o onchange llamabamos a formkit.handlesubmit
                    o formkit.value.name ahora remplazamos ese formkit por props*/}
                    <Formik
                        // este props de formkit recibe el yup de schemaValidation y hace las comprobaciones 
                        validationSchema={schemaValidation}

                        // este prop reinicia el formulario
                        enableReinitialize
                        // y este porp le da los valores de cada uno de las key del objeto solo tenemos que llamarlas como props.value.key
                        initialValues={getProductId}
                        // le pasamos la edicion a travez de una prop
                        // se le uede pasar dos parametros values es lo que el usuario le pasa  de el formulario en este caso
                        //un objeto para editar y cambiar su estado
                        //el segundo puedes pasarle funciones predeterminadas de formkit para ayudarte pero no le pasaremos ninguna
                        //no obstante la dejamos 
                        onSubmit={(values, funnc) => {
                            //dentro invocamos una funcion para que actualice el cliente funcion creado por nosotros
                            updateProductNow(values)
                        }}
                    >
                        {props => {
                            // con este return tenemos que abrazar todo el formulario 
                            return (
                                <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                                    onSubmit={props.handleSubmit}
                                >
                                    <div className='mb-4'>
                                        <label className='block text-gray-800 text-center  text-sm font-bold mb-2' htmlFor='name'> Name</label>
                                        <input
                                            className=' shadow appearance-none text-center  border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                            id='name'
                                            type='text'
                                            placeholder='name of product'
                                            // manda el valor del formulario es decir lo conecta con formkit
                                            value={props.values.name}
                                            // si no tiene el onchange no podras escribir en el formulario
                                            onChange={props.handleChange}
                                            // se usa para validar el formulario si el usuario sale del campo en este caso de email
                                            onBlur={props.handleBlur}
                                        />
                                        {props.touched.name && props.errors.name ? (
                                            <div>
                                                <p className='mt-2 text-white bg-red-500 text-center rounded'>{props.errors.name}</p>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className='mb-4'>
                                        <label className='block text-center text-gray-800  text-sm font-bold mb-2' htmlFor='price'> Price</label>
                                        <input
                                            className=' shadow appearance-none border text-center  rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                            id='price'
                                            type='number'
                                            placeholder='Price of product'
                                            // manda el valor del formulario es decir lo conecta con formkit
                                            value={props.values.price}
                                            // si no tiene el onchange no podras escribir en el formulario
                                            onChange={props.handleChange}
                                            // se usa para validar el formulario si el usuario sale del campo en este caso de email
                                            onBlur={props.handleBlur}
                                        />
                                        {props.touched.price && props.errors.price ? (
                                            <div>
                                                <p className='mt-2 text-white bg-red-500 text-center rounded'>{props.errors.price}</p>
                                            </div>
                                        ) : null}
                                    </div>  <div className='mb-4'>
                                        <label className='block text-center text-gray-800  text-sm font-bold mb-2' htmlFor='stock'> stock</label>
                                        <input
                                            className=' shadow appearance-none text-center border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                            id='stock'
                                            type='number'
                                            placeholder='stock client'
                                            // manda el valor del formulario es decir lo conecta con formkit
                                            value={props.values.stock}
                                            // si no tiene el onchange no podras escribir en el formulario
                                            onChange={props.handleChange}
                                            // se usa para validar el formulario si el usuario sale del campo en este caso de email
                                            onBlur={props.handleBlur}
                                        />
                                        {props.touched.stock && props.errors.stock ? (
                                            <div>
                                                <p className='mt-2 text-white bg-red-500 text-center rounded'>{props.errors.stock}</p>
                                            </div>
                                        ) : null}
                                    </div>

                                    <input type="submit"
                                        className=' bg-gray-500 text-white cursor-pointer rounded w-full mt-5 p-2  uppercase font-bold
                            hover:bg-gray-400 hover:text-black  duration-300'
                                        value='Edit client' />
                                </form>

                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    )
}
export default editProdut