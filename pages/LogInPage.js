import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'
import Logo from '../components/Logo'

const ATENTICATE_USER = gql`
 mutation autenticateUser($input:AutenticateInput){
   autenticateUser(input:$input){
     token
   }
 }

`;

const LogIn = () => {
    const [message, saveMessage] = useState(null)
    const [autenticateUser] = useMutation(ATENTICATE_USER)
    const [isExist, isNotExist] = useState(false)

    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('email is required')
                .email('email invalid'),
            password: Yup.string()
                .required('password is required')
                .min(6, 'min 6 character '),

        }),
        onSubmit: async values => {
            try {
                const { data } = await autenticateUser({
                    variables: {
                        input: {
                            email: values.email,
                            password: values.password
                        }
                    }

                })
                // mensaje
                isNotExist(false)
                saveMessage("welcome")
                //guardar en local storage
                const token = data.autenticateUser.token
                localStorage.setItem('token', token)

                //redirigir
                setTimeout(() => {
                    saveMessage(null)
                    router.push('/')
                }, 2000)


            } catch (error) {
                isNotExist(true)
                saveMessage("email or password incorrect")
                console.log(error)

                setTimeout(() => {
                    saveMessage(null)
                }, 3000)
            }
        }
    })



    return (
        <Layout>

            <div className='flex flex-col justify-center'>
                <Logo />
                <h2 className='text-center text-white text-2xl my-4' >Login</h2>
            </div>

            {message ? (
                <div className={isExist ? 'bg-red-400 text-white py-5 px-2 w-full my-3 text-center max-w-sm mx-auto '
                    : 'bg-green-400 text-white py-2 px-5 w-full my-3 text-center max-w-sm mx-auto '}
                >
                    <p>{message}</p>
                </div>
            ) : null}
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
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
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
                        <input
                            type='submit'
                            className='bg-gray-800 w-full mt-5 p-2 text-white  uppercase
                            hover:bg-gray-500 hover:text-black transition-all duration-300 cursor-pointer'
                            value="Log in" />
                    </form>
                </div>
            </div>
        </Layout>
    )
}
export default LogIn