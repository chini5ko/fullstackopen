# fullstackopen
A repo that contains all my fullstackopen assigments 

# Full Stack Open URLS
- [home](https://fullstackopen.com/en)
- [Courses](https://fullstackopen.com/en#course-contents)
- [submit](https://studies.cs.helsinki.fi/stats/courses/fullstackopen)

## Git

```js
rm -rf .git
```

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
- npm install json-server --save-dev
```js
//Install json-server as a development dependency (only used during development)
```
- npm run server

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

# promise 
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