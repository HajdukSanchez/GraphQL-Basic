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
  getPeople: async () => {
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
  getPerson: async (root, { id }) => {
    let db, student
    try {
      db = await connectDB()
      student = await db.collection('students').findOne({ _id: ObjectID(id) })
    } catch (error) {
      errorHandler(error)
    }
    return student
  },

  /* Queries for all the info with Unions */
  searchItems: async (root, { keyWord }) => {
    /* For make a global search, we need to add index to our databases in MONGO
    So we need first go to the database and index the information */
    let db, searchItems, courses, people
    try {
      db = await connectDB()
      courses = await db
        .collection('courses')
        .find({ $text: { $search: keyWord } })
        .toArray()
      people = await db
        .collection('students')
        .find({ $text: { $search: keyWord } })
        .toArray()
      searchItems = [...courses, ...people]
    } catch (error) {
      errorHandler(error)
    }
    return searchItems
  },
}
