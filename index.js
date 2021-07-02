'use strict'

// GraphQL
const { makeExecutableSchema } = require('graphql-tools')
// Express
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
// For reading Schema extern
const { readFileSync } = require('fs')
const { join } = require('path')
// Resolvers
const resolvers = require('./lib/resolvers')

const app = express() // create the express system server
const port = process.env.port || 3000 // Port for using our server

// We define the schema
// Here we read a Schema from a extern context
// The first parameter is what we are reading and the second one is the character encoding
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// The first parameter is a root route into our server
app.use(
  '/api',
  graphqlHTTP({
    schema: schema, // Schema to execute
    rootValue: resolvers, // Are the resolvers to execute?
    graphiql: true, // The development environment
  })
)
// we start the listener of the requires
app.listen(port, () => {
  console.log(`server is listening at port http://localhost:${port}/api`)
})
