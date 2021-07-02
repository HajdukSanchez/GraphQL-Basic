// Configuration of the resolvers
'use strict'

// This is the "data base"
const courses = [
  {
    _id: 'anyid1',
    title: 'First title 1',
    teacher: 'Teacher',
    description: 'This is a description',
    topic: 'Development',
  },
  {
    _id: 'anyid2',
    title: 'First title 2',
    teacher: 'Teacher',
    description: 'This is a description',
    topic: 'Development',
  },
  {
    _id: 'anyid3',
    title: 'First title 3',
    teacher: 'Teacher',
    description: 'This is a description',
    topic: 'Development',
  },
]

// When we call this one of these resolvers this is what we are going to return
module.exports = {
  getCourses: () => {
    return courses
  },
}
