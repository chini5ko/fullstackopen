const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {

  // check
  if (!request.body['url'] && !request.body['title']) {
    response.status(400)
  }


  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter