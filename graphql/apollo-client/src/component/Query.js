import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const QUERY = gql`
    query {
        books {
            author,
            title
        }
    }
`;


function Query() {
    const { loading, error, data, refetch } = useQuery(QUERY)

    useEffect(() => {
        refetch()
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    console.log('book', data)
    const list = data.books.map(v => (
        <div>{v.author}: {v.title}</div>
    ))

    return list
}

export default Query;
