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