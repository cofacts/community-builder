import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { relayStylePagination } from '@apollo/client/utilities';

const client = new ApolloClient({
  link: ApolloLink.from([
    new BatchHttpLink({
      uri: `${process.env.REACT_APP_API_URL}/graphql`,
      headers: {
        'x-app-id': 'RUMORS_SITE',
      },
    }),
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          ListReplies: relayStylePagination(['filter']),
          ListReplyRequests: relayStylePagination(['filter']),
          ListArticleReplyFeedbacks: relayStylePagination(['filter']),
        },
      },
    },
  }),
});

export default client;
