const Koa = require('koa');
const { ApolloServer, gql, PubSub, withFilter } = require('apollo-server-koa');

const pubsub = new PubSub()

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String,
    books: [Book],
    book(id : String) : Book
  }

  type Book {
    title: String
    author: String
  }


  type Mutation {
    createBook(id: ID!, title: String!, author: String!): Book!
  }

  type Subscription {
    subsBook(id: ID!): Book
  }

`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        books: (parent, args) => {
            return [
                {
                    title: 'abc',
                    author: 'xxxx'
                }
            ]
        },
        book: (parent, { id }) => {

            console.log('parent', parent)
            console.log('query books:', id)
            return {
                title: 'abc',
                author: 'xxxx'
            }

        }
    },

    Mutation: {
        
        createBook: (parent, args) => {
            console.log('createBook ....',args)

            return {
                title: 'abc',
                author: 'xxxx'
            }
        } 
    },

    Subscription: {
        subsBook: {
            // 过滤不需要订阅的消息
            subscribe: withFilter(
                (parent, { id }) => pubsub.asyncIterator('UPDATE_BOOK'), 
                (payload, variables) => payload.subsBook.id === variables.id
            ),
            resolve: (payload, variables) => {
                console.log('🚢 接收到数据： ', payload)
                return payload.subsBook
            }
        }
    }

};

setInterval( () => {
    pubsub.publish('UPDATE_BOOK', { subsUser: {
        title:'abc',
        author: 'yyy'
    } })
},1000)


const server = new ApolloServer({ typeDefs, resolvers });

const app = new Koa();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);