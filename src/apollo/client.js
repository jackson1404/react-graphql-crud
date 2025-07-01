import { InMemoryCache, HttpLink } from '@apollo/client'

const httpLink = new HttpLink({
    uri: 'http://localhost:8080/graphiql',
});

// This is the GraphQL endpoint for your server
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            fetchPolicy: 'cache-and-network',
        },
    },
});

export default client