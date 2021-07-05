'use strict'

const { ObjectId } = require('mongodb')
const connectDB = require('./db')

// Handle the errors
const errorHandler = require('./errorHandler')

module.exports = {
  /* Create mutations */
  createCourse: async (root, { input }) => {
    // This is an object with the no obligatory information
    const defaults = {
      teacher: '',
      topic: '',
    }
    // We create an object with the information gave by parameters and the default if we don't have info in this variables
    const newCourse = Object.assign(defaults, input)
    let db, course
    try {
      db = await connectDB()
      course = await db.collection('courses').insertOne(newCourse)
      // InsertedID returns the last ID inserted into the database
      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler(error)
    }
    // We return the information that we send by parameter plus the id that mongo created for them
    return newCourse
  },
  createPerson: async (root, { input }) => {
    let db, student
    try {
      db = await connectDB()
      student = await db.collection('students').insertOne(input)
      // InsertedID returns the last ID inserted into the database
      input._id = student.insertedId
    } catch (error) {
      errorHandler(error)
    }
    // We return the information that we send by parameter plus the id that mongo created for them
    return input
  },

  /* Edit mutations */
  editCourse: async (root, { _id, input }) => {
    let db, course
    try {
      db = await connectDB()
      course = await db.collection('courses').updateOne(
        { _id: ObjectId(_id) }, // The id of the object that we are going to change
        { $set: input } // Set use the input, it is the info that we are going to change
      )
      course = await db.collection('courses').findOne({ _id: ObjectId(_id) }) // We have the new course with the updates, for return to the user
    } catch (error) {
      errorHandler(error)
    }
    return course
  },
  editPerson: async (root, { _id, input }) => {
    let db, student
    try {
      db = await connectDB()
      student = await db.collection('students').updateOne(
        { _id: ObjectId(_id) }, // The id of the object that we are going to change
        { $set: input } // Set use the input, it is the info that we are going to change
      )
      student = await db.collection('students').findOne({ _id: ObjectId(_id) }) // We have the new course with the updates, for return to the user
    } catch (error) {
      errorHandler(error)
    }
    return student
  },
  addPeople: async (root, { courseID, personID }) => {
    let db, person, course
    try {
      db = await connectDB()
      course = await db.collection('courses').findOne({ _id: ObjectId(courseID) })
      person = await db.collection('students').findOne({ _id: ObjectId(personID) })
      if (!course || !person) throw new Error('Course or person not found')
      await db.collection('courses').updateOne(
        { _id: ObjectId(courseID) },
        // The addToSet find if we have the array people, but if we don't is going to created it
        { $addToSet: { people: ObjectId(personID) } } // We add the person inside the people array
      )
    } catch (error) {
      errorHandler(error)
    }
    return course
  },
}
