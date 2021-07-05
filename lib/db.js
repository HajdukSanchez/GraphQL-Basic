'use strict'

// Mongo db connector
const { MongoClient } = require('mongodb')
// Handle the errors
const errorHandler = require('./errorHandler')

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

// Mongo connection
const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
let connection

// function for get database data
async function connectDB() {
  if (connection) return connection
  let client
  try {
    client = await new MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    connection = client.db(DB_NAME)
  } catch (error) {
    errorHandler(error)
    process.exit(1)
  }
  return connection // If we don't have problems we return the connection and we can use mongo
}

module.exports = connectDB
