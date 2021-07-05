'use strict'

const { ObjectId } = require('mongodb')
const connectDB = require('./db')

// Handle the errors
const errorHandler = require('./errorHandler')

module.exports = {
  // This is for resolve a course request
  Course: {
    people: async ({ people }) => {
      let db, peopleData, ids
      try {
        db = await connectDB()
        ids = people ? people.map((id) => ObjectId(id)) : [] //If we don't have people into our course, returns an empty array
        peopleData =
          ids.length > 0
            ? await db
                .collection('students')
                .find(
                  { _id: { $in: ids } } // We search all the students is inside people array returned
                )
                .toArray()
            : []
      } catch (error) {
        errorHandler(error)
      }
      return peopleData
    },
  },
}
