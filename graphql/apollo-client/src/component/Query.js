import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const QUERY = gql`
    query {
        book{
            title,
            author
        }
    }
`;

function Query() {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log('aaa',data.book)
  const {author,title} = data.book
  return (
      <div>{author}: {title}</div>
  );
}

export default Query;
