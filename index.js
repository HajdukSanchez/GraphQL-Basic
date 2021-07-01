'use strict'

const { graphql, buildSchema } = require('graphql')

// We define the schema
const schema = buildSchema(`
type Query {
  hello: String
}`)

// Execute the query Hello
// This returns a promise
graphql(schema, '{hello}').then((data) => {
  console.log(data)
})
