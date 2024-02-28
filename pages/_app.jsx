import { ApolloProvider } from "@apollo/client"
import client from "../config/apollo"
import '../styles/globals.css'
import OrderState from "../context/OrderState"




// este archivo es como el componente princpial de la aplicacion next lño lee si pones _app como el principal
//lo que hagamos aqui lo propagaremos a todo los componentes
const MyApp = ({ Component, pageProps }) => {


    return (
        // lo que haces es abrazar con apolloprovider toda la app dandole su funcionalidad
        <ApolloProvider client={client}>
            {/* llamamos al OrderState y englobamos toda la web para pasarselo toda la informacion y englobar esa informacion a todo 
            los componentes */}
            <OrderState>

                {/* componente contiene el componente que se este viendo en pantalla */}
                <Component
                    client={client}
                    {...pageProps} />


            </OrderState>
        </ApolloProvider>

    )
}
export default MyApp
