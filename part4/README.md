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