// Configuration of the resolvers
'use strict'

// Connect the different types of procedures
const queries = require('./queries')
const mutations = require('./mutations')
const types = require('./types')

// When we call this one of these resolvers this is what we are going to return
module.exports = {
  Query: queries,
  Mutation: mutations,
  ...types, // We do this because if we don't we need to write manually all the types that we define
}
