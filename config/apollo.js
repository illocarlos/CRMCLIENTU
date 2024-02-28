import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';


//configuracion de conexion al backend
//le pasamos este calor al client de abajo
// 1*le decimos donde se conecte del backen
const HttpLink = createHttpLink({
    uri: 'http://localhost:4000/',
});


//agregar token
// 1* esta funcion puede modificar los header y le agregamos uno nuevo

const authLink = setContext((_, { headers }) => {
    // leer el storage almacenado
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    // 1* y aqui conectamos los dos de arriba le decimos donde se conecte y le agregamos un header nuevo
    link: authLink.concat(HttpLink),
});

export default client;