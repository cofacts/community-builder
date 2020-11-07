import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';

const client = new ApolloClient({
  link: ApolloLink.from([
    new BatchHttpLink({
      uri: `${process.env.REACT_APP_API_URL}/graphql`,
      headers: {
        'x-app-id': 'RUMORS_SITE',
      },
    }),
  ]),
  cache: new InMemoryCache(),
});

export default client;
