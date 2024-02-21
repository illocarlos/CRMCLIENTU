import React from 'react'
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/router'
import Header from './Header';
// usando children donde llamemos Layout vamos a recoger lo que este dentro de Layout
// y le pasamos la infromacion si en una page dentro de la llamada del componente de
//  layout metemos infromacion esta se reflejara en este componente y todo lo que este fuera de ese children se compartira en todas las pag
//se suele colocar fuera la barra de navegacion

const Layout = ({ children }) => {
    const router = useRouter()


    return (
        <>

            {/* al no haber html este es el componente padre le pasamos el header con las especificaciones generales de la web  */}
            <Head>

                <title>CRM</title>
                {/* instalacion tailwind */}
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
                {/* este link da estilos a la web uno de ellos es margenes en la pantallña  */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </Head>
            {router.pathname === '/LogInPage' || router.pathname === '/NewAccountPage' ? (
                <div className='bg-gray-800 min-h-screen flex flex-col justify-center'>

                    <div>
                        {children}
                    </div>
                </div>

            ) : (
                <div className='bg-gray-200 min-h-screen'>
                    <div className='flex min-h-screen'>
                        <Sidebar />
                        <main className=' sm:w-2/3 lg:w-9/12 sm:min-h-screen p-5 '>
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