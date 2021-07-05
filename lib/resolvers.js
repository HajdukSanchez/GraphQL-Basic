// Configuration of the resolvers
'use strict'

// Connect the different types of procedures
const queries = require('./queries')
const mutations = require('./mutations')

// When we call this one of these resolvers this is what we are going to return
module.exports = {
  Query: queries,
  Mutation: mutations,
}
