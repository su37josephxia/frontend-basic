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
    const { data, loading } = useSubscription(
        GQL,
    //   { variables: { repoFullName } }
    )
    return <h4>SubBook title: {!loading && data.subsBook.title}</h4>;
  }

export default Subscription;
