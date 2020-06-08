import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';


import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// 单纯Query Mutation
// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   // uri: 'https://48p1r2roz4.sse.codesandbox.io'
// });


// client
//   .query({
//     query: gql`
//       query {
//         book{
//           title,
//           author
//         }
//       }
//     `
//   })
//   .then(result => console.log('graphql:', result));

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});


// Create an http link:
// const httpLink = new HttpLink({
//   uri: 'http://localhost:4000/graphql'
// });

// // Create a WebSocket link:
// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000/graphql`,
//   options: {
//     reconnect: true
//   }
// });

// // using the ability to split links, you can send data to each link
// // depending on what kind of operation is being sent
// const link = split(
//   // split based on operation type
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );


const client = new ApolloClient({
  networkInterface: link
});


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
