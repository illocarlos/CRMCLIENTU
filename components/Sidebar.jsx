import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from './Logo'

const Sidebar = () => {
    // lo usamos para hacer clases dinamicas ya que router.pathname te da el lugar en el que estas 
    const router = useRouter()

    return (
        <aside className='bg-gray-800 sm:w-1/3 lg:w-3/12 sm:min-h-screen p-5 '>
            <div>
                <Logo />
                <p className='text-white text-center font-extrabold text-xl my-6'>
                    CRM SANSON
                </p>
            </div>
            <nav className='mt-5 list-none text-white'>
                <li className={router.pathname === "/" ? "text-blue-300 font-extrabold underline" : ""}>
                    <Link href={'/'}>
                        <a className='mb-3 block'>
                            Clients
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/Orders/OrdersPage" ? "text-blue-300 font-extrabold underline " : ""}>
                    <Link href={'/Orders/OrdersPage'}>
                        <a className='mb-3 block'>
                            Orders

                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/Products/ProductPage" ? "text-blue-300 font-extrabold underline" : ""}>
                    <Link href={'/Products/ProductPage'}>
                        <a className='mb-3 block'>
                            Products

                        </a>
                    </Link>
                </li>
            </nav>
        </aside>
    )
}
export default Sidebar