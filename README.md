# fullstackopen
A repo that contains all my fullstackopen assigments 

# Full Stack Open URLS
- [home](https://fullstackopen.com/en)
- [Courses](https://fullstackopen.com/en#course-contents)
- [submit](https://studies.cs.helsinki.fi/stats/courses/fullstackopen)


# Resources

## JS
- [Mozilla JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Mozilla re-intro](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
- [youDontKnowJS](https://github.com/getify/You-Dont-Know-JS)
- [https://javascript.info/](https://javascript.info/)
- [asynchronous_model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

# libraries

## Server
[jsonServer](https://github.com/typicode/json-server)
- npm install -g json-server
- npx json-server --port 3001 --watch db.json

## axios
- npm install axios --save
[axiosLibrary](https://github.com/axios/axios)

## npm
- [transitiveDependencies](https://lexi-lambda.github.io/blog/2016/08/24/understanding-the-npm-dependency-model/)
- npm install json-server --save-dev
```js
//Install json-server as a development dependency (only used during development)
```
- npm run server

## web server library , Express
defining it as a project dependency with the command
```
npm install express --save
```

# Middleware

[Middleware](http://expressjs.com/en/guide/using-middleware.html) functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

```js
//The json-parser we used earlier takes the raw data from the requests that's stored in the request object, parses it into a JavaScript object and assigns it to the request object as a new property body

app.use(express.json())
```
##### during dev
```
npm install --save-dev nodemon
node_modules/.bin/nodemon index.js
```

##### Same origin policy and CORS
```js
const cors = require('cors')

app.use(cors())
```

# notes
There is a fine difference in the parameters. axios is installed as a runtime dependency (--save) of the application, because the execution of the program requires the existence of the library. On the other hand, json-server was installed as a development dependency (--save-dev),
```
npm install axios --save
npm install json-server --save-dev
```
```js
{
  // package.json 
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server -p3001 --watch db.json"
  },
}
```

## Enviromental Var
[doteven](https://github.com/motdotla/dotenv#readme)
```
npm install dotenv --save
```

##### video
[functional programming](https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)
[eventLoopJs](https://www.youtube.com/watch?v=8aGhZQkoFbQ)


# Debugging Tips 
- [VS_Snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_creating-your-own-snippets)

- [higherOrderFunc](https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)

## Git

```js
rm -rf .git
```

# JS Important Concept 

## Event 
The event parameter is the event that triggers the call to the event handler function:

- The event handler immediately calls the event.preventDefault() method, which prevents the default action of submitting a form. The default action would, among other things, cause the page to reload.
```js
const addNote = (event) => {
  event.preventDefault()
  console.log('button clicked', event.target)
}
```

##### Object Spread
In practice { ...note } creates a new object with copies of all the properties from the note object. When we add properties inside the curly braces after the spreaded object, e.g. { ...note, important: true }, then the value of the important property of the new object will be true. In our example the important property gets the negation of its previous value in the original object.
```js
const changedNote = { ...note, important: !note.important }
```

# promise 
[js.info](https://javascript.info/promise-chaining)
[uDontknwJS](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/async%20%26%20performance/ch3.md)

A Promise is an object representing the eventual completion or failure of an asynchronous operation.

## Effect Hook
The Effect Hook lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects. ~ react Doc 

```js
//example
 const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}

//By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.
useEffect(hook, [])
//The second parameter of useEffect is used to specify how often the effect is run. If the second parameter is an empty array [], then the effect is only run along with the first render of the component.
  ```



### Three distinct states:

- The promise is pending: It means that the final value (one of the following two) is not available yet.

- The promise is fulfilled: It means that the operation has completed and the final value is available, which generally is a successful operation. This state is sometimes also called resolved.

- The promise is rejected: It means that an error prevented the final value from being determined, which generally represents a failed operation.

```js
axios
  .get('http://example.com/probably_will_fail')
  .then(response => {
    console.log('success!')
  })
  .catch(error => {
    console.log('fail')
  })
  ```

# REST
Representational State Transfer, aka. REST 
[REST_Dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)

### RESTful thinking
Every resource has an associated URL which is the resource's unique address.

### api
Let's assume that the root URL of our service is 
```
www.example.com/api.
```

## REST API
[def](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven)






# ES6

### object declaration
```js
const name = 'Leevi'
const age = 0

//new
const person = { name, age }

//old
const person = {
  name: name,
  age: age
}

```

# CSS

### importing the file 
```js
//top of react file
 import './someFile.css'

 // some css file
 {
  color: green;
  font-style: italic;
  font-size: 16px;
}
 ```

### importing the file 
```js
{
  color: 'green',
  fontStyle: 'italic',
  fontSize: 16
}
```

```js
//example
const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
    </div> 
  )
}

const App = () => {
  // ...

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      // ...  

      <Footer />
    </div>
  )
}
```

# REACT Strucutre
The structural units that make up the application's functional entities are React components. A React component defines the HTML for structuring the content, the JavaScript functions for determining functionality, and also the component's styling; all in one place. This is to create individual components that are as independent and reusable as possible.


# deploy 

## Heroku
```sh
$ heroku create
$ git push heroku master
$ heroku ps:scale web=1s
$ heroku logs --tail
```

# Database

# MongoDB
[MongoDB_Atals](mongodb.com/cloud/atlas)

### JS models
Models are so-called constructor functions that create new JavaScript objects based on the provided parameters. Since the objects are created with the model's constructor function, they have all the properties of the model, which include methods for saving the object to the database.


# esLint configuration
[Eslint_Website](https://eslint.org/)
Add ESlint to your application and fix all the warnings.
- [AirBnbEslintConfit](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
```js
npm install eslint --save-dev
```

```js
node_modules/.bin/eslint --init
```

# JEST

### Shell
```s
npm test
npm test -- tests/note_api.test.js
npm test -- -t 'a specific note is within the returned notes'
npm test -- -t 'notes'


```

```js
{
//...
  "scripts": {
    "test": "jest --verbose"
  },
  "author": "Hector Liang",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1",
  },
  "devDependencies": {
    "jest": "^26.3.0",
  }, 
  "jest": {
    "testEnvironment": "node"
  }
}

```

### Testing
values
```js
// single values 
    expect(average([])).toBe(0)

// Objects 
     const mostLikedBlog = {
    author: 'Robert C. Martin',
    blogs: 3
  }

  test('Robert C. Martin has the most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(mostLikedBlog)
  })
```


http
```js
   .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
```

arrays
```js
 const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)

  expect(contents).toContain(
    'Browser can execute only Javascript'
  )
```

# async/await

## await 
- in order to use the await operator with asynchronous operations, they have to return a promise.
- Using await is possible only inside of an async function
```js
const main = async () => {
  const notes = await Note.find({})
  console.log('operation returned the following notes', notes)

  const response = await notes[0].remove()
  console.log('the first note is removed')
}

main()

//back-end
notesRouter.get('/', async (request, response) => { 
  const notes = await Note.find({})
  response.json(notes)
})
```
```js
// await, 
const notes = await Note.find({}) //<- The execution of code pauses  
// .
// .
//  waits until the related promise is fulfilled, then continues its execution to the next line
console.log('operation returned the following notes', notes)

// then chain
Note.find({})
  .then(notes => {
    return notes[0].remove()
  })
  .then(response => {
    console.log('the first note is removed')
    // more code here
  })

// The Note.find() method returns a promise and we can access the result of the operation by registering a callback function with the then method
Note.find({}).then(notes => {
  console.log('operation returned the following notes', notes)
})


```

## Eliminating the try-catch

```js
try {
  // do the async operations here
} catch(exception) {
  next(exception)
}
```

```js
// npm install express-async-errors --save

require('express-async-errors')

//new
notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

//old 
notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

```

### Promise.all(someArray)

```js
beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
})
```

# [userAdmin](https://fullstackopen.com/en/part4/user_administration#populate)
- [github](https://github.com/kelektiv/node.bcrypt.js)
- one way HASH
```
npm install bcrypt --save
```

```js
const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
```

### Mongo Unique user 
- npm install --save mongoose-unique-validator
```js
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
})

userSchema.plugin(uniqueValidator)
```

### token 
- 
```s
npm install jsonwebtoken --save
```

