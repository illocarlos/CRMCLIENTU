import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import { useQuery, gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import * as Yup from 'yup'

import { Formik } from 'formik';
const GET_CLIENT = gql`
  query getOnlyClient($id:ID!){
    getOnlyClient(id:$id){
      name
      company
      phone
      surnames
      email
    }
  }
`;

const UPDATE_CLIENT = gql`
mutation updateClient($id:ID!,$input:ClientInput){
updateClient(id:$id,input:$input){
  
  name
  surnames
  company
  email
  phone
}
}
`

const editclient = () => {
    // obtener id actual
    const router = useRouter();

    const { query } = router; // Extraer el id de la ruta
    const id = query.pid


    // traer ese cliente cliente
    const { data, loading, error } = useQuery(GET_CLIENT, {
        variables: { id }
    });

    //actualizar cliente 
    const [updateClient] = useMutation(UPDATE_CLIENT)




    // schema de validacion que le pasamos al componente formkit con una props especial
    const schemaValidation = Yup.object({
        name: Yup.string().required('The name is required'),
        surnames: Yup.string().required('The surname is required'),
        //primero validamos si existe o no contenido si tiene pasamos a la segunda validacion
        // esta validacion email valida si es de tipo email con sus nomenclatura si no la pasa envia el error 
        email: Yup.string().required('email is required').email('email invalid'),
        // password usamos min que observa si tiene minimo 6 caracteres si tiene 5 da error
        company: Yup.string().required('company is required'),
        phone: Yup.string().required('company is required')
    })


    if (loading) return null
    // esta abrazado por un objeto hay que declararo abrazado con llaves 
    const { getOnlyClient } = data

    const updateClientNow = async values => {
        const { name, surnames, company, phone, email } = values

        try {
            const { data } = await updateClient({
                variables: {
                    id,
                    input: {
                        name,
                        surnames,
                        company,
                        phone,
                        email
                    }
                }

            });

            //mensaje de exito al editar
            Swal.fire({
                position: "top-end",
                width: "200",
                icon: "success",
                title: " Edit client",
                showConfirmButton: false,
                timer: 1500
            });
            // redirigimos a index si se actualiza
            router.push('/')
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <Layout>
            <h1>Edit Client</h1>
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
                        initialValues={getOnlyClient}
                        // le pasamos la edicion a travez de una prop
                        // se le uede pasar dos parametros values es lo que el usuario le pasa  de el formulario en este caso
                        //un objeto para editar y cambiar su estado
                        //el segundo puedes pasarle funciones predeterminadas de formkit para ayudarte pero no le pasaremos ninguna
                        //no obstante la dejamos 
                        onSubmit={(values, funnc) => {
                            //dentro invocamos una funcion para que actualice el cliente funcion creado por nosotros
                            updateClientNow(values)
                        }}
                    >
                        {props => {
                            // con este return tenemos que abrazar todo el formulario 
                            return (
                                <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                                    onSubmit={props.handleSubmit}
                                >
                                    <div className='mb-4'>
                                        <label className='block text-white text-center  text-sm font-bold mb-2' htmlFor='name'> Name</label>
                                        <input
                                            className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                            id='name'
                                            type='text'
                                            placeholder='name client'
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
                                        <label className='block text-white text-center text-sm font-bold mb-2' htmlFor='surnames'> Surname</label>
                                        <input
                                            className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                            id='surnames'
                                            type='text'
                                            placeholder='Surname client'
                                            // manda el valor del formulario es decir lo conecta con formkit
                                            value={props.values.surnames}
                                            // si no tiene el onchange no podras escribir en el formulario
                                            onChange={props.handleChange}
                                            // se usa para validar el formulario si el usuario sale del campo en este caso de email
                                            onBlur={props.handleBlur}
                                        />
                                        {props.touched.surnames && props.errors.surnames ? (
                                            <div>
                                                <p className='mt-2 text-white bg-red-500 text-center rounded'>{props.errors.surnames}</p>
                                            </div>
                                        ) : null}
                                    </div>  <div className='mb-4'>
                                        <label className='block text-white text-center  text-sm font-bold mb-2' htmlFor='company'> Company</label>
                                        <input
                                            className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                            id='company'
                                            type='text'
                                            placeholder='company client'
                                            // manda el valor del formulario es decir lo conecta con formkit
                                            value={props.values.company}
                                            // si no tiene el onchange no podras escribir en el formulario
                                            onChange={props.handleChange}
                                            // se usa para validar el formulario si el usuario sale del campo en este caso de email
                                            onBlur={props.handleBlur}
                                        />
                                        {props.touched.company && props.errors.company ? (
                                            <div>
                                                <p className='mt-2 text-white bg-red-500 text-center rounded'>{props.errors.company}</p>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className='mb-4'>
                                        <label className='block text-white text-center  text-sm font-bold mb-2' htmlFor='c'> Phone</label>
                                        <input
                                            className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                            id='phone'
                                            type='tel'
                                            placeholder='phone client'
                                            // manda el valor del formulario es decir lo conecta con formkit
                                            value={props.values.phone}
                                            // si no tiene el onchange no podras escribir en el formulario
                                            onChange={props.handleChange}
                                            // se usa para validar el formulario si el usuario sale del campo en este caso de email
                                            onBlur={props.handleBlur}
                                        />
                                        {props.touched.phone && props.errors.phone ? (
                                            <div>
                                                <p className='mt-2 text-white bg-red-500 text-center rounded'>{props.errors.phone}</p>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className='mb-4'>
                                        <label className='block text-white text-center text-sm font-bold mb-2' htmlFor='email'> email</label>
                                        <input
                                            className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                            id='email'
                                            type='text'
                                            placeholder='email client'
                                            // manda el valor del formulario es decir lo conecta con formkit
                                            value={props.values.email}
                                            // si no tiene el onchange no podras escribir en el formulario
                                            onChange={props.handleChange}
                                            // se usa para validar el formulario si el usuario sale del campo en este caso de email
                                            onBlur={props.handleBlur}
                                        />
                                        {props.touched.email && props.errors.email ? (
                                            <div>
                                                <p className='mt-2 text-white bg-red-500 text-center rounded'>{props.errors.email}</p>
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
export default editclient