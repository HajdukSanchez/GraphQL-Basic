// Configuration of the resolvers
'use strict'

// Connection to the DB that we made
const connectDB = require('./db')
// Object for identify the parameter
const { ObjectID } = require('mongodb')

// When we call this one of these resolvers this is what we are going to return
module.exports = {
  Query: {
    getCourses: async () => {
      let db,
        courses = []
      try {
        db = await connectDB()
        courses = await db.collection('courses').find().toArray()
      } catch (error) {
        console.error(error)
      }
      return courses
    },
    // The first one we are not going to use them
    getCourse: async (root, { id }) => {
      let db, course
      try {
        db = await connectDB()
        course = await db.collection('courses').findOne({ _id: ObjectID(id) })
      } catch (error) {
        console.error(error)
      }
      return course
    },
  },
}
