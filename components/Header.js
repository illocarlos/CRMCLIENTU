import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';

const GET_USER = gql`
query getUser{
getUser{
  id
  name
  surnames
  
}
}
`;
const Header = () => {

    const router = useRouter();

    // query de apollo
    const { data, loading, error } = useQuery(GET_USER);

    // console.log(data)
    // console.log(loading)
    // console.log(error)

    // Proteger que no accedamos a data antes de tener resultados
    if (loading) return null;

    // Si no hay informacion
    // if (!data) {
    //     return router.push('/LogInPage');
    // }
    console.log('----->', data.getUser)
    const { name, surnames } = data.getUser;

    const logOut = () => {
        localStorage.removeItem('token');
        router.push('/LogInPage');
    }

    return (
        <div className='flex justify-between mb-4 '>
            <p className='mr-2 text-sm'>{name} {surnames}</p>
            <button
                onClick={() => logOut()}
                type='button' className='bg-gray-600 w-full uppercase sm:w-auto px-2 py-1 text-xs rounded text-white'>log out</button>
        </div>
    )
}
export default Header