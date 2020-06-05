import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const CREATE_BOOK = gql`
    mutation CreateBook($id:ID!,$title:String!,$author:String!){
        createBook(id:$id,title:$title,author:$author){
            title,
            author
        }
    }
`;

function Mutation() {
    let input;
    const [createBook, { data }] = useMutation(CREATE_BOOK);

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    createBook({
                        variables: {
                            "id": "2",
                            "title": "王五",
                            "author": "xxxx@qq.com"
                        }
                    });
                    console.log('mutation:',data)
                    input.value = '';
                }}
            >
                <input
                    ref={node => {
                        input = node;
                    }}
                />
                <button type="submit">Create Book</button>
            </form>
        </div>
    );
}

export default Mutation;
