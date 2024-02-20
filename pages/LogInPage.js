import React from 'react'
import Layout from '../components/Layout'



const LogIn = () => {
    return (
        <Layout>
            <h2 className='text-center text-white text-2xl' >Login</h2>
            <div className='flex justify-center mt-5 '>
                <div className='w-full max-w-sm'>
                    <form className='bg-white rounded px-8 pt-6 pb-8 mb-4'>
                        <div className='mb-4'>
                            <label className='block text-gray-800 text-sm font-bold mb-2' htmlFor='email'> Email</label>
                            <input
                                className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline '
                                id='email'
                                type='email'
                                placeholder='email user'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-800 text-sm font-bold mb-2' htmlFor='password'> Password</label>
                            <input
                                className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none outline'
                                id='password'
                                type='password'
                                placeholder='password user'
                            />
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