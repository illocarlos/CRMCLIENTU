import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';

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

    if (loading) return <p>Loading...</p>;
    const routerPush = data
    // Proteger que no accedamos a data antes de tener resultados
    //nos echa si no tenemos data o el token protegemos asi la ruta
    if (!routerPush || !localStorage.token) {
        router.push('/LogInPage')
    }
    // si tenemos data hacemos otro filtro con el loading para pasarle la data


    // cerramos sesion y borramos token
    const logOut = () => {
        localStorage.removeItem('token');
        // esto limpia el objeto que recibe  
        client.clearStore();
        router.push('/LogInPage');
    }

    return (
        <div className='flex justify-between mb-4 '>
            <p className='mr-2 text-sm text-black'>{data.getUser.name} {data.getUser.surnames}</p>
            <button
                onClick={() => logOut()}
                type='button' className='bg-gray-600 w-full uppercase sm:w-auto px-2 py-1 text-xs rounded text-white'>log out</button>
        </div>
    )
}
export default Header