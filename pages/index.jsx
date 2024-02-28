import Layout from '../components/Layout'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Client from '../components/Client';
import Loader from '../components/Loader/Loader';
// traemos el mutation schema de gql  al frontend 
const GET_CLIENTS_SELLER = gql`
query getClientsSeller{
   getClientsSeller{
    id
    name
    surnames
    email
    phone
    company
  }
}
    `;
const Index = () => {
  const router = useRouter()


  // const router = useRouter()
  // consulta apollo
  //loading el tiempo de carga
  //error es el error que se pasa del backend
  const { data, loading, client, error } = useQuery(GET_CLIENTS_SELLER)


  if (loading) return <div className='w-sceen h-screen flex justify-center'><Loader /></div>

  if (!localStorage.token) {

    client.clearStore()
    router.push('/LogInPage');
    return <Loader />
  }

  return (
    <Layout>
      <h2 className='text-2xl text-gray-800 font-bold text-center uppercase' >Clients list</h2>
      <Link href={'/ClientWeb/NewClientPage'} >
        <p className='cursor-pointer text-sm uppercase font-bold rounded inline-block text-white bg-blue-800 py-2 px-5 mt-5 hover:bg-blue-500 duration-300 w-full lg:w-auto text-center '>new client</p>
      </Link>
      <div className=' overflow-x-scroll'>

        <table className='table-auto shadow-md mt-10 w-full w-lg'>
          <thead className='bg-gray-800'>
            <tr className='text-white'>
              <th className='w-1/5 py-2'>Name</th>
              <th className='w-1/5 py-2'>surnames</th>
              <th className='w-1/5 py-2'>company</th>
              <th className='w-1/5 py-2'>email</th>
              <th className='w-1/5 py-2'>phone</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {data.getClientsSeller.map(client => (
              // le pasamos las propr al componente client 
              <Client
                key={client.id}
                client={client}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>

  )
}
export default Index
