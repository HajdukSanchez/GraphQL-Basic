'use strict'

const { graphql, buildSchema } = require('graphql')

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

// Execute the query Hello
// This returns a promise
graphql(schema, '{goodbye}', resolvers).then((data) => {
  console.log(data)
})
