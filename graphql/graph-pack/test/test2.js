const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()
const PORT = process.env.PORT || 7000

const schema = buildSchema(`
  type Query {
    hello: String,
    test: String
  }
`)

const root = {
  hello: () => 'Hello world!',
  test: () => 'GraphQL 是 Facebook 开发的一种开源查询语言。它为我们提供了一种更有效的设计、创建和使用 Api的方法。从根本上说，它是 REST 的替代品。'
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(PORT, () =>
  console.log(`Now browse to http://localhost:${ PORT }/graphql`)
)
