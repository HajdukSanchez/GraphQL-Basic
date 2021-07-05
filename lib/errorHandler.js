'use strict'

function errorHandler(error) {
  console.log(error)
  throw new Error('Error trying to make the operation: ', error)
}

module.exports = errorHandler
