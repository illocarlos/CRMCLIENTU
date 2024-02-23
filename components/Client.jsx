import React from 'react'
import Swal from 'sweetalert2';
import { useMutation, gql } from '@apollo/client'
import Deleted from './ButtonsComponent/Deleted';
import Edit from './ButtonsComponent/Edit';
import Router from 'next/router';

const DELETED_CLIENT = gql`
mutation deletedClient($id:ID!){
  deletedClient(id:$id)
}
`;
const GET_CLIENTS_SELLER = gql`
query getClientsSeller{
   getClientsSeller{
    id
    name
    surnames
    email
    company
  }
}
    `;

const client = ({ client }) => {


    const [deletedClient] = useMutation(DELETED_CLIENT, {
        // a diferencia de actualizar el cache y introducir un objeto que le tenemos que pasar un data
        //aqui solo usamos cache para llamarlo y axctualizarlo por que vamos a borrar y no tenemos que pasarle nada
        update(cache) {
            //obtener copia de objeto de cache

            const { getClientsSeller } = cache.readQuery({ query: GET_CLIENTS_SELLER });
            // reescribir cahce
            cache.writeQuery({
                query: GET_CLIENTS_SELLER,
                data: {
                    getClientsSeller: getClientsSeller.filter(eachClient => eachClient.id !== id)
                }
            })
        }
    })
    // desctructuramos el objeto para solo pasarle el valor concreto  sin llamarlo client.name
    const { id, name, surnames, company, email, phone } = client


    // eliminar client
    const deleteThisClient = (id) => {
        // paquete de alertas predefinido
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            // aqui ponemos la accion de borrar si le damos a ok
            if (result.isConfirmed) {
                try {
                    const { data } = await deletedClient({
                        variables: {
                            id
                        }
                    })
                    Swal.fire({
                        position: "top-end",
                        width: "200",
                        title: "Deleted!",
                        text: "Your client has been deleted.",
                        icon: "success"
                    });
                } catch (error) {

                    console.log(error)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your client has been deleted.",
                        icon: "error"
                    });

                }



            }
        });
    }

    const editClient = () => {
        // con este ROUTER podemos mandar a donde queramos pasandole informacion 
        Router.push({
            pathname: "/ClientWeb/EditClientPage/[id]",
            query: { id }
        })
    }
    return (
        <tr >
            <td className='border px-4 py-2 text-center'>{name}</td>
            <td className='border px-4 py-2 text-center'>{surnames}</td>
            <td className='border px-4 py-2 text-center'>{company}</td>
            <td className='border px-4 py-2 text-center' >{email}</td>
            <td className='border px-4 py-2 text-center'>{phone}</td>
            <td className='mx-2 '>
                <button
                    onClick={() => editClient(id)}
                    type='buttton'
                    className=' flex justify-center items-center'>
                    <Edit />
                </button>
            </td>
            <td className='mx-2 '>
                <button
                    onClick={() => deleteThisClient(id)}
                    type='buttton'
                    className='  ml-5 flex justify-center items-center'>
                    <Deleted />
                </button>
            </td>

        </tr>
    )
}
export default client