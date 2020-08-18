const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

// const Blog = require('../models/blog')
// const helper = require('./test_helper')

describe('user administration', () => {
  test('check that invalid users are not created, password is less than 3', async () => {
    // const responseBlogs = await api.get('/api/blogs')
    const newUser = {
      'username': 'qwert',
      'name': 'hector',
      'password': '1j'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    // responseBlogs.body.forEach(async (blog) => {
    //   await expect(blog.likes).toBeDefined()
    // })
  })

  test('check that invalid users are not created, duplicate users', async () => {
    // const responseBlogs = await api.get('/api/blogs')
    const newUser = {
      'username': 'nisko',
      'name': 'hector',
      'password': '12j'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    // responseBlogs.body.forEach(async (blog) => {
    //   await expect(blog.likes).toBeDefined()
    // })
  })
})

afterAll(() => {
  mongoose.connection.close()
})