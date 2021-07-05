'use strict'

const connectDB = require('./db')

module.exports = {
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
      console.error(error)
    }
    // We return the information that we send by parameter plus the id that mongo created for them
    return newCourse
  },
}
