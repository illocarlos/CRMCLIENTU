import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from './Logo';

const Sidebar = () => {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [clicked, setClicked] = useState(false);
    const toggleMenu = () => {
        setClicked(!clicked)
        setMenuOpen(!menuOpen);
    };

    return (
        <aside className='bg-gray-800 sm:w-1/3 lg:w-1/5 sm:min-h-screen p-5 relative'>
            <div className='flex justify-between md:hidden'>

                <button
                    onClick={toggleMenu}
                    className={`group cursor-pointer outline-none ${clicked ? 'rotate-90 duration-500' : 'rotate-0 duration-500'}`}
                    title="Add New"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50px"
                        height="50px"
                        viewBox="0 0 24 24"
                        class="stroke-blue-400 fill-none group-hover:fill-blue-800 group-active:stroke-blue-200 group-active:fill-blue-600 group-active:duration-0 duration-300"
                    >
                        <path
                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                            stroke-width="1.5"
                        ></path>
                        <path d="M8 12H16" stroke-width="1.5"></path>
                        <path d="M12 16V8" stroke-width="1.5"></path>
                    </svg>
                </button>


                <div >
                    <Logo />
                    <p className='text-white text-center font-extrabold text-xl my-6'>
                        CRM SANSON
                    </p>
                </div>
            </div>
            <div className='hidden md:block' >
                <Logo />
                <p className='text-white text-center font-extrabold text-xl my-6 '>
                    CRM SANSON
                </p>
            </div>
            <nav className={`mt-5 list-none text-white lg:hidden ${menuOpen ? 'max-h-screen transition-max-height duration-500 ease-in-out' : 'max-h-0 overflow-hidden duration-500'}`}>
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
                <div>
                    <p className='text-white text-center uppercase font-extrabold text-xl my-6'>
                        Ranking
                    </p>
                </div>
                <li className={router.pathname === "/Ranking/BestsSellersPage" ? "text-blue-300 font-extrabold underline" : ""}>
                    <Link href={'/Ranking/BestsSellersPage'}>
                        <a className='mb-3 block'>
                            Bests sellers
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/Ranking/BestsClients/Page" ? "text-blue-300 font-extrabold underline" : ""}>
                    <Link href={'/Ranking/BestsClientsPage'}>
                        <a className='mb-3 block'>
                            Bests Clients
                        </a>
                    </Link>
                </li>
            </nav>
            <nav className='mt-5 list-none text-white hidden lg:block '>
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
                <div>
                    <p className='text-white text-center uppercase font-extrabold text-xl my-6'>
                        Ranking
                    </p>
                </div>
                <li className={router.pathname === "/Ranking/BestsSellersPage" ? "text-blue-300 font-extrabold underline" : ""}>
                    <Link href={'/Ranking/BestsSellersPage'}>
                        <a className='mb-3 block'>
                            Bests sellers
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/Ranking/BestsClients/Page" ? "text-blue-300 font-extrabold underline" : ""}>
                    <Link href={'/Ranking/BestsClientsPage'}>
                        <a className='mb-3 block'>
                            Bests Clients
                        </a>
                    </Link>
                </li>
            </nav>
        </aside>
    );
};

export default Sidebar;
