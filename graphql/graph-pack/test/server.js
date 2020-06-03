const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')

const app = express()
const PORT = process.env.PORT || 7000

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(PORT, () =>
  console.log(`Server started on port http://localhost:${ PORT }/graphql`)
)
