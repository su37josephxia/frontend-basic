const { ApolloServer, gql } = require('apollo-server');

// Schema定义
const typeDefs = gql`
  type Query {
    hello: String,
  }
`;

// 实现
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    }
};

// 创建服务器实例
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});