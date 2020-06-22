import React, { useEffect } from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Query from './Query'

const subs = gql`
    subscription {
        subsBooks
    }
`;

function Subscription() {
    useSubscription(subs)
    return <Query/>
}

export default Subscription;
