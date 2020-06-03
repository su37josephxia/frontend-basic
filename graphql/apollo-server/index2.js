const { ApolloServer, gql , PubSub, withFilter} = require('apollo-server');
const pubsub = new PubSub()
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
                // (payload, variables) => payload.subsBook.id === variables.id
                (payload, variables) => {
                    console.log(payload,variables)
                    return true 
                }
            ),
            resolve: (payload, variables) => {
                console.log('🚢 接收到数据： ', payload)
                return payload.subsBook
            }
        }
    }

};

setInterval( () => {
    console.log('update....')
    pubsub.publish('UPDATE_BOOK', { subsBook: {
        id: 1,
        title:'abc',
        author: 'yyy'
    } })
},1000)

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});