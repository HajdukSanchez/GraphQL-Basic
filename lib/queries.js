'use strict'

// Connection to the DB that we made
const connectDB = require('./db')
// Object for identify the parameter
const { ObjectID } = require('mongodb')
// Handle the errors
const errorHandler = require('./errorHandler')

module.exports = {
  /* Queries for courses */
  getCourses: async () => {
    let db,
      courses = []
    try {
      db = await connectDB()
      courses = await db.collection('courses').find().toArray()
    } catch (error) {
      errorHandler(error)
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
      errorHandler(error)
    }
    return course
  },

  /* Queries for student */
  getStudents: async () => {
    let db,
      students = []
    try {
      db = await connectDB()
      students = await db.collection('students').find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return students
  },
  // The first one we are not going to use them
  getStudent: async (root, { id }) => {
    let db, student
    try {
      db = await connectDB()
      student = await db.collection('students').findOne({ _id: ObjectID(id) })
    } catch (error) {
      errorHandler(error)
    }
    return student
  },
}
