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
    let title;
    let author;

    const [create, { data }] = useMutation(CREATE_BOOK);

    const [clear] = useMutation(CLEAR_BOOK)

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    create({
                        variables: {
                            "title": title.value,
                            "author": author.value
                        }
                    });
                    console.log('mutation:',data)
                    title.value = '';
                }}
            >
                <input
                    value = "TTT"
                    ref={node => {
                        title = node;
                    }}
                />
                <input
                    value = "AAAA"
                    ref={node => {
                        author = node;
                    }}
                />
                <button type="submit">Create</button>
            </form>
            <button onClick={ clear }>Clear</button>
        </div>
    );
}

export default Mutation;
