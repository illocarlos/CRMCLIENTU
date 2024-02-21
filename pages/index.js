import Layout from '../components/Layout'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router';

// traemos el mutation schema de gql  al frontend 
const GET_CLIENTS = gql`
 query getClients{
getClients {
  id
  name
  surnames
  email
company
phone
}
}
    `;
const Index = () => {

  const router = useRouter()
  // consulta apollo
  //loading el tiempo de carga
  //error es el error que se pasa del backend
  const { data, loading } = useQuery(GET_CLIENTS)

  if (loading) return 'loading....';

  // if (!data.getClients) {
  //   return router.push('/LogInPage');
  // }



  return (
    <Layout>
      <h2 className='text-2xl text-gray-800 font-light' >Clients</h2>
      <table className='table-auto shadow-md mt-10 w-full w-lg'>
        <thead className='bg-gray-800'>
          <tr className='text-white'>
            <th className='w-1/5 py-2'>Name</th>
            <th className='w-1/5 py-2'>surnames</th>
            <th className='w-1/5 py-2'>company</th>
            <th className='w-1/5 py-2'>email</th>
            <th className='w-1/5 py-2'>phone</th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {data.getClients.map(client => (
            <tr key={client.id}>
              <td className='border px-4 py-2 text-center'>{client.name}</td>
              <td className='border px-4 py-2 text-center'>{client.surnames}</td>
              <td className='border px-4 py-2 text-center'>{client.company}</td>
              <td className='border px-4 py-2 text-center' >{client.email}</td>
              <td className='border px-4 py-2 text-center'>{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>

  )
}
export default Index
