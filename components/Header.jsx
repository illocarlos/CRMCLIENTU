import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import Loader from './Loader/Loader';

const GET_USER = gql`
query getUser{
getUser{
  id
  email
  name
  surnames
  
}
}
`;
const Header = () => {

    const router = useRouter();

    // query de apollo
    const { data, loading, client } = useQuery(GET_USER);

    if (loading) return <div className='w-sceen h-screen flex justify-center'><Loader /></div>

    // Proteger que no accedamos a data antes de tener resultados
    //nos echa si no tenemos data o el token protegemos asi la ruta
    if (!data || !localStorage.token) {
        router.push('/LogInPage')
    }
    // si tenemos data hacemos otro filtro con el loading para pasarle la data
    localStorage.setItem('Lid', data.getUser.email)
    // cerramos sesion y borramos token
    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('Lid');
        // esto limpia el objeto que recibe  
        client.clearStore();
        router.push('/LogInPage');
    }

    return (
        <div className='flex  justify-between mb-4 '>
            <p className='mr-2 mb-5 lg:mb-0 text-sm text-black'><span className='uppercase mr-2'>Welcome</span>{data?.getUser.name} {data?.getUser.surnames}</p>
            <button
                onClick={() => logOut()}
                type='button' className='bg-gray-600  uppercase px-2  text-xs rounded text-white md:px-4 md:py-2'>log out</button>
        </div>
    )
}
export default Header