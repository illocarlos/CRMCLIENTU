import React from 'react'
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/router'
import Header from './Header';
import { gql, useQuery } from '@apollo/client'
import Loader from './Loader/Loader';

const GET_USER = gql`
query getUser{
getUser{
  id
  email
  name
  surnames
  employed
}
}
`;

// usando children donde llamemos Layout vamos a recoger lo que este dentro de Layout
// y le pasamos la infromacion si en una page dentro de la llamada del componente de
//  layout metemos infromacion esta se reflejara en este componente y todo lo que este fuera de ese children se compartira en todas las pag
//se suele colocar fuera la barra de navegacion

const Layout = ({ children }) => {
    const router = useRouter()
    const { data, loading } = useQuery(GET_USER);

    if (loading) return <div className='w-sceen h-screen flex justify-center items-center content-center '><Loader /></div>
    const user = data



    return (
        <>

            {/* al no haber html este es el componente padre le pasamos el header con las especificaciones generales de la web  */}
            <Head>

                <title>CRM</title>
            </Head>
            {router.pathname === '/LogInPage' || router.pathname === '/NewAccountPage' ? (
                <div className='bg-gray-800 min-h-screen flex flex-col justify-center'>

                    <div>
                        {children}
                    </div>
                </div>

            ) : (
                <div className='bg-gray-200 min-h-screen'>
                    <div className=' sm:flex min-h-screen'>
                        <Sidebar />
                        <main
                            user={user}
                            className=' sm:w-2/3 lg:w-9/12  sm:min-h-screen p-5 '>
                            <Header />
                            {children}
                        </main>
                    </div >
                </div >
            )}

        </>
    );
}
export default Layout;