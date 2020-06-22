import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const CREATE_BOOK = gql`
    mutation CreateBook($title:String!,$author:String!){
        createBook(title:$title,author:$author){
            id,
            title,
            author
        }
    }
`;

const CLEAR_BOOK = gql`
    mutation {
        clearBook
    }
`;

function Mutation() {
    const [create, { data }] = useMutation(CREATE_BOOK);

    const [clear] = useMutation(CLEAR_BOOK)

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    create({
                        variables: {
                            "title": 'Title' + (Math.random() * 100).toFixed(),
                            "author": 'Author'+ (Math.random() * 100).toFixed()
                        }
                    });
                    console.log('mutation:',data)
                }}
            >
                
                <button type="submit">Create</button>
            </form>
            <button onClick={ clear }>Clear</button>
        </div>
    );
}

export default Mutation;
