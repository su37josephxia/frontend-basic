import React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GQL = gql`
    subscription {
        subsBook(id:123){
            title
        }
    }
`;

function Subscription() {
    const { data: data, loading } = useSubscription(
        GQL,
    //   { variables: { repoFullName } }
    );
    setInterval(() => {
        console.log('data:',data)

    },1000)

    
    return <h4>SubBook title: {!loading && JSON.stringify(data)}</h4>;
  }

export default Subscription;
