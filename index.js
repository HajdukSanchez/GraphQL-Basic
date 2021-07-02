'use strict'

//GraphQL
const { graphql, buildSchema } = require('graphql')
// Express
const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const app = express() // create the express system server
const port = process.env.port || 3000 // Port for using our server

// We define the schema
const schema = buildSchema(`
type Query {
  hello: String
  goodbye: String
}`)

// Configuration of the resolvers
const resolvers = {
  hello: () => {
    return 'hello world'
  },
  goodbye: () => {
    return 'Goodbye'
  },
}

// The first parameter is a root route into our server
app.use(
  '/api',
  graphqlHTTP({
    schema: schema, // Schema to execute
    rootValue: resolvers, // Are the resolvers to execute?
    graphiql: true, //The development environment
  })
)
// we start the listener of the requires
app.listen(port, () => {
  console.log(`server is listening at port http://localhost:${port}/api`)
})
