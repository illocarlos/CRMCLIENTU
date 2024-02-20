import React from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'

// traemos el mutation schema de gql  al frontend 
const NEW_USER = gql`
  mutation createUser($input:UserInput){
   createUser(input:$input){
  name
  surnames
  email
   }
 }
    `

const NewAcount = () => {



    // MUTATION PARA CREAR NUEVOS USUARIOS para mutation usamos [ ] y querys { }
    //usamos el hook useMutation y le pasamos el mutation de gql que viene del backend y lo pasamos arriba
    //retornando la funcion de arriba es decir tenemos que colocar en el array lafuncion de createuser dentro
    const [createUser] = useMutation(NEW_USER) //y esta funcion es l que vamos a usar en el submit para realizar la peticion


    // validacion del formulario
    //initialValues es como el state no tienes que definir un state por cada input
    //onSubmit se conecta con el submit del formulario le pondremos la conexion de apollo para crear un usuario
    //validationschema es una forma sencilla de filtrar en el formulario y mandar un mensaje si no pasa la validaciones
    //si no la pasa no se envia 
    const formik = useFormik({
        initialValues: {
            name: '',
            surnames: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('The name is required'),
            surnames: Yup.string().required('The surname is required'),
            //primero validamos si existe o no contenido si tiene pasamos a la segunda validacion
            // esta validacion email valida si es de tipo email con sus nomenclatura si no la pasa envia el error 
            email: Yup.string().required('email is required').email('email invalid'),
            // password usamos min que observa si tiene minimo 6 caracteres si tiene 5 da error
            password: Yup.string().required('password is required').min(6, 'min 6 character '),
        }),
        onSubmit: async value => {
            console.log('------', value.email)
            try {
                await createUser({
                    user: {
                        input: {
                            name: value.name,
                            surnames: value.surnames,
                            email: value.email,
                            password: value.password,
                        }
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <Layout>
            <h2 className='text-center text-white text-2xl' >Create Account</h2>
            <div className='flex justify-center mt-5 '>
                <div className='w-full max-w-sm'>
                    <form className='bg-white rounded px-8 pt-6 pb-8 mb-4'
                        onSubmit={formik.handleSubmit}>
                        <div className='mb-4'>
                            <label className='block text-gray-800 text-sm font-bold mb-2' htmlFor='email'> Email</label>
                            <input
                                className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                id='email'
                                type='text'
                                placeholder='email user'
                                // manda el valor del formulario es decir lo conecta con formkit
                                value={formik.values.email}
                                // si no tiene el onchange no podras escribir en el formulario
                                onChange={formik.handleChange}
                                // se usa para validar el formulario si el usuario sale del campo en este caso de email
                                onBlur={formik.handleBlur}
                            />
                            {/* aqui mandamos el error lo dibujamos en pantalla  el touched es si le doy cliclk a ese input 
                            y me salgo automaticamente lo valida y el errors es validar si existe el error recoge tanto el anterior
                            como si enviamos el formulario */}
                            {formik.touched.email && formik.errors.email ? (
                                <div>
                                    <p className='mt-2 text-white bg-red-500 text-center rounded'>{formik.errors.email}</p>
                                </div>
                            ) : null}
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-800 text-sm font-bold mb-2' htmlFor='password'> Password</label>
                            <input
                                className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                id='password'
                                type='password'
                                placeholder='password user'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div>
                                    <p className='mt-2 text-white bg-red-500 text-center rounded'>{formik.errors.password}</p>
                                </div>
                            ) : null}
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-800 text-sm font-bold mb-2' htmlFor='name'> Name</label>
                            <input
                                className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                id='name'
                                type='text'
                                placeholder='Name user'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div>
                                    <p className='mt-2 text-white bg-red-500 text-center rounded'>{formik.errors.name}</p>
                                </div>
                            ) : null}
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-800 text-sm font-bold mb-2' htmlFor='surnames'> Surnames</label>
                            <input
                                className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                id='surnames'
                                type='text'
                                placeholder='Surnames user'
                                value={formik.values.surnames}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.surnames && formik.errors.surnames ? (
                                <div>
                                    <p className='mt-2 text-white bg-red-500 text-center rounded'>{formik.errors.surnames}</p>
                                </div>
                            ) : null}
                        </div>
                        <input
                            type='submit'
                            className='bg-gray-800 w-full mt-5 p-2 text-white  uppercase
                            hover:bg-gray-500 hover:text-black transition-all duration-300 cursor-pointer'
                            value="Create account" />
                    </form>
                </div>
            </div>
        </Layout>
    )
}
export default NewAcount;