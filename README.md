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

