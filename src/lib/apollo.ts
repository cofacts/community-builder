import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: ApolloLink.from([
    new BatchHttpLink({
      uri: `${process.env.REACT_APP_API_URL}/graphql`,
    }),
  ]),
  cache: new InMemoryCache(),
});

export default client;
