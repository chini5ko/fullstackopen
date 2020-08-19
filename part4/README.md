# 4.22*: bloglist expansion, step10
After adding token based authentication the tests for adding a new blog broke down. Fix now the tests. Write also a new test that ensures that adding a blog fails with proper status code 401 Unauthorized if token is not provided.
# 4.21*: bloglist expansion, step9
Change the delete blog operation so that a blog can be deleted only by the user who added the blog. Therefore, deleting a blog is possible only if the token sent with the request is the same as that of the blog's creator.

If deleting a blog is attempted without a token or by a wrong user, the operation should return a suitable status code.
# 4.20*: bloglist expansion, step8
This example from part 4 shows taking the token from the header with the getTokenFrom helper function.

If you used the same solution, refactor taking the token to a middleware. The middleware should take the token from the Authorization header and place it to the token field of the request object.

```js
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  else{
    request.token = null
  }
  next()
}
```

# 4.19: bloglist expansion, step7
Modify adding new blogs so that it is only possible if a valid token is sent with the HTTP POST request. The user identified by the token is designated as the creator of the blog.

Headers 
```js
authorization bearer tokenValuejnwklkvjwrrkpsnjns

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


```

# 4.18: bloglist expansion, step6
Implement token-based authentication according to part 4 chapter Token authentication.

```js
// POST 
{
    "username":"someUserName",
    "password": "PassWord"
}

// Return 

{
    "token": "eyJhbkjfbwhjelwjekiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoaW5pc2tvIiwia",
    "username": "someUserName",
    "name": "hector"
}
```

```s
npm install jsonwebtoken --save
```

# 4.17: bloglist expansion, step5
Expand blogs so that each blog contains information on the creator of the blog.

Modify adding new blogs so that when a new blog is created, any user from the database is designated as its creator (for example the one found first). Implement this according to part 4 chapter populate.

```js
// populate user in blogs

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

// http get
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')
  response.json(users.map(u => u.toJSON()))
})
// schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
    required: true
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})
```


# 4.16*: bloglist expansion, step4
Add a feature which adds the following restrictions to creating new users: Both username and password must be given. Both username and password must be at least 3 characters long. The username must be unique.

```js

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
    required: true
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
})

if (body.password.length < 3) {
    response.status(400).json('password is less than 3 character')
  }
```

uniqueness 
- npm install --save mongoose-unique-validator


# 4.15: bloglist expansion, step3
Implement a way to create new users by doing a HTTP POST-request to address api/users. Users have username , password and name.

- models/user.js
- controllers/users.js
- add this to app.js

Libraries: 
- npm install --save mongoose-unique-validator
- npm install bcrypt --save

# 4.14 Blog list expansions, step2
Implement functionality for updating the information of an individual blog post.

Use async/await.
```js
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: request.params.id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())

})
```

# 4.13 Blog list expansions, step1
Implement functionality for deleting a single blog post resource.

Use the async/await syntax. Follow RESTful conventions when defining the HTTP API.

Feel free to implement tests for the functionality if you want to. Otherwise verify that the functionality works with Postman or some other tool.

```js
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
```


# 4.12*: Blog list tests, step5
Write a test related to creating new blogs via the /api/blogs endpoint, that verifies that if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.

```js

describe('HTTP POST /api/blogs with no title or url ', () => {
  test('with no title', async () => {

    const newBlog = {
      '_id': '5a422a851b54a676234d17f9',
      'author': 'Nisko L',
      'url': 'https://reactpatterns.com/',
      'likes': 100,
      '__v': 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length )
  })

  test('with no url', async () => {

    const newBlog = {
      '_id': '5a422a851b54a676234d17f9',
      'title': 'who is who',
      'author': 'Nisko L',
      'likes': 100,
      '__v': 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length )
  })
})
```

Make the required changes to the code so that it passes the test.
# 4.11*: Blog list tests, step4
Write a test that verifies that if the likes property is missing from the request, it will default to the value 0. Do not test the other properties of the created blogs yet.

Make the required changes to the code so that it passes the test.

```js

describe('HTTP verifies the likes property', () => {
  test('http likes', async () => {
    const responseBlogs = await api.get('/api/blogs')

    responseBlogs.body.forEach(async (blog) => {
      if (blog.likes === undefined) {
        blog.likes = 0
      }
    })

    responseBlogs.body.forEach(async (blog) => {
      await expect(blog.likes).toBeDefined()
    })

  })
})
```


# 4.10: Blog list tests, step3
Write a test that verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post. At the very least, verify that the total number of blogs in the system is increased by one. You can also verify that the content of the blog post is saved correctly to the database.

```js

describe('HTTP POST /api/blogs ', () => {
  test('http application returns the correct amount of blog', async () => {

    const newBlog = {
      '_id': '5a422a851b54a676234d17f9',
      'title': 'qwertyu',
      'author': 'Nisko L',
      'url': 'https://reactpatterns.com/',
      'likes': 100,
      '__v': 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  })
})
```

# 4.9*: Blog list tests, step2
Write a test that verifies that the unique identifier property of the blog posts is named id, by default the database names the property _id. Verifying the existence of a property is easily done with Jest's toBeDefined matcher.

Make the required changes to the code so that it passes the test. The toJSON method discussed in part 3 is an appropriate place for defining the id parameter.

```js
describe('HTTP id  ', () => {
  test('http unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})
```

# 4.8: Blog list tests, step1
Use the supertest package for writing a test that makes an HTTP GET request to the /api/blogs url. Verify that the blog list application returns the correct amount of blog posts in the JSON format

 Verify that the blog list application returns the correct amount of blog posts in the JSON format.

 Notice that you will have to make similar changes to the code that were made in the material, like defining the test environment so that you can write tests that use their own separate database.


```js
// running filter: npm test -- -t "http"
// added test_helper to init the blogs 
beforeEach(async () => {
  await Blog.deleteMany({})

  const BlogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = BlogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('HTTP GET /api/blogs ', () => {
  test('http application returns the correct amount of blog', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
})

```
# 4a test results 
```jest
PASS  tests/mostLikes.test.js
  Most Liked Blog
    √ Edsger W. Dijkstra has the most likes (15 ms)

 PASS  tests/favoriteBlog.test.js  
  favorite Blog
    √ Canonical string reduction had the most number of likes (32 ms)

 PASS  tests/mostBlogs.test.js     
  favorite Blog
    √ Robert C. Martin has the most blogs (8 ms)

 PASS  tests/dummy.test.js
  √ dummy returns one (4 ms)

 PASS  tests/totalLikes.test.js
  total likes
    √ of empty list is zero (18 ms)
    √ when list has only one blog equals the likes of that (1 ms)
    √ of a biggest list is calculated right (3 ms)
``` 

# 4.7*: helper functions and unit tests, step5
Define a function called mostLikes that receives an array of blogs as its parameter. The function returns the author, whose blog posts have the largest amount of likes.

```js


// test 
const listHelper = require('../utils/list_helper')
const blogs = require('./blogsJSON')

describe('Most Liked Blog', () => {

  const mostLikedBlog = {
    author: 'Edsger W. Dijkstra',
    likes: 17
  }

  test('Edsger W. Dijkstra has the most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(mostLikedBlog)
  })
})

//helper 
const mostLikes = (blogs) => {
  const map = new Map()

  blogs.map(blog => map.set(blog.author, (map.has(blog.author)) ? map.get(blog.author) + blog.likes : blog.likes ))

  let mostLikes = {
    'author': '',
    'likes' : 0
  }

  for (let [author, likes] of map){
    if(mostLikes.likes < likes){
      mostLikes = {
        'author': author,
        'likes' : likes
      }
    }
  }

  return mostLikes
}

```

# 4.6*: helper functions and unit tests, step4
Define a function called mostBlogs that receives an array of blogs as a parameter. The function returns the author who has the largest amount of blogs. 

```js
//test 


describe('favorite Blog', () => {

  const mostLikedBlog = {
    author: 'Robert C. Martin',
    blogs: 3
  }

  test('Robert C. Martin has the most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(mostLikedBlog)
  })
})

// helper 
const mostBlogs = (blogs) => {
  const map = new Map()

  blogs.map(blog => map.set(blog.author, (map.has(blog.author)) ? map.get(blog.author) + 1 : 1 ))

  let mostBlogs = {
    'author': '',
    'blogs' : 0
  }

  for (let [author, blogs] of map){
    if(mostBlogs.blogs < blogs){
      mostBlogs = {
        'author': author,
        'blogs' : blogs
      }
    }
  }

  return mostBlogs

}

```

# 4.5*: helper functions and unit tests, step3
Define a new favoriteBlog function that receives a list of blogs as a parameter. The function finds out which blog has most likes. If there are many top favorites, it is enough to return one of them.

```js
// helper

const favoriteBlog = (blogs) => {
  const reducer = (mostLiked, blog) => {
    return (mostLiked.likes > blog.likes) ? mostLiked : blog
  }
  return blogs.reduce(reducer)
}
// test 
const listHelper = require('../utils/list_helper')
const blogs = require('./blogsJSON')

describe('favorite Blog', () => {

  const mostLikedBlog = {
    '_id': '5a422b3a1b54a676234d17f9',
    'title': 'Canonical string reduction',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    'likes': 12,
    '__v': 0
  }

  test('Canonical string reduction had the most number of likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(mostLikedBlog)
  })
})

```

```

 PASS  tests/dummy.test.js       
  √ dummy returns one (4 ms)

 PASS  tests/totalLikes.test.js
  total likes
    √ of empty list is zero (3 ms)
    √ when list has only one blog equals the likes of that (1 ms)
    √ of a biggest list is calculated right (1 ms)

 PASS  tests/favoriteBlog.test.js
  favorite Blog
    √ Canonical string reduction had the most number of likes (4 ms)

Test Suites: 3 passed, 3 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        3.514 s
Ran all test suites.
```

# 4.4: helper functions and unit tests, step2
Define a new totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts.

```js
// list_helper.js
const totalLikes = (blogs) => {
  if (blogs.length === 0){
    return 0
  }
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer,0)
}

// totalLikes.test
const listHelper = require('../utils/list_helper')

describe('total likes', () => {

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a biggest list is calculated right', () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)
    expect(result).toBe(8)
  })

})


```

# 4.3: helper functions and unit tests, step1
First define a dummy function that receives an array of blog posts as a parameter and always returns the value 1.

```
 PASS  tests/dummy.test.js
  √ dummy returns one (3 ms)
```

```js
const dummy = (blogs) => {
  return 1
  // ...
}

module.exports = {
  dummy
}
```
```js
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
```

# 4.2 Blog list, step2
Refactor the application into separate modules as shown earlier in this part of the course material.

```
├── index.js
├── app.js
├── build
│   └── ...
├── controllers
│   └── blogs.js
├── models
│   └── blog.js
├── package-lock.json
├── package.json
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js  

```


# 4.1 Blog list, step1
Let's imagine a situation, where you receive an email that contains the following application body:

Turn the application into a functioning npm project. In order to keep your development productive, configure the application to be executed with nodemon. You can create a new database for your application with MongoDB Atlas, or use the same database from the previous part's exercises.

```js
//post body 
{
    "title":"The k",
   "author":"Nisko",
   "url": "www.chinisko.com",
   "likes": 1000000000000000
}

// get
[
    {
        "_id": "5f31c564e93f0e195c355b7d",
        "title": "who's who",
        "author": "who",
        "url": "www.12.g",
        "likes": 2,
        "__v": 0
    },
    {
        "_id": "5f31c5e6e93f0e195c355b7e",
        "title": "The k",
        "author": "Nisko",
        "url": "www.chinisko.com",
        "likes": 1000000000000000,
        "__v": 0
    }
]
```


```js
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```