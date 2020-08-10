# a) Node.js and Express


### Express.js
a javascript webservice library 

```js

const express = require('express')
const app = express()

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

```

##### event handler 
- the route defines the event handler 
- handle HTTP GET requests made to the application's / root:
```js
// Since the parameter is a string, express automatically sets the value of the Content-Type header to be text/html
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
```
The event handler function accepts two parameters. 
- The first request parameter contains all of the information of the HTTP request, 
- and the second response parameter is used to define how the request is responded to.

```js
app.get('/api/notes', (request, response) => {
  response.json(notes)
})
```

The request is responded to with the json method of the response object. Calling the method will send the notes array that was passed to it as a JSON formatted string. Express automatically sets the Content-Type header with the appropriate value of application/json.

##### unique notes
```js
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => { return note.id == id   })
    console.log(note)
    response.json(note)
})
```

##### delete
```js
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})
```


### handling errors
Our application works and sends the error status code if no note is found. However, the application doesn't return anything to show to the user, like web applications normally do when we visit a page that does not exist. We do not actually need to display anything in the browser because REST API's are interfaces that are intended for programmatic use, and the error status code is all that is needed.
```js
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => { return note.id == id  })

    if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
})
```


### Node.js
 Node.js uses so-called [CommonJS](https://en.wikipedia.org/wiki/CommonJS) modules

```js
// same as import http from 'http'
//Node's built-in web server 
const http = require('http')

//The code uses the createServer method of the http module to create a new web server.

//An event handler is registered to the server, that is called every time an HTTP request is made to the server's address http://localhost:3001.
const app = http.createServer((req, res) => {

//The request is responded to with the status code 200, with the Content-Type header set to text/plain, and the content of the site to be returned set to Hello World.
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello World')
})

//The last rows bind the http server assigned to the app variable, to listen to HTTP requests sent to the port 3001
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

##### using the server to return json
The application/json value in the Content-Type header informs the receiver that the data is in the JSON format. The notes array gets transformed into JSON with the JSON.stringify(notes) method.

```js
const http = require('http')

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

# Receiving data
```js
//the express json-parser
app.use(express.json())

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})
```


```js
Math.max(...notes.map(n => n.id))
```
What exactly is happening in that line of code? notes.map(n => n.id) creates a new array that contains all the id's of the notes. Math.max returns the maximum value of the numbers that are passed to it. However, notes.map(n => n.id) is an array so it can't directly be given as a parameter to Math.max. The array can be transformed into individual numbers by using the "three dot" spread syntax ....


Without the json-parser, the body property would be undefined.
# postman 
- no [curl](https://curl.haxx.se/)
- but [POSTMAN](https://www.postman.com/)
- REST client from VSC