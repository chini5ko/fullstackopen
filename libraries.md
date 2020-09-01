# Production
- npm install express --save
- npm install cors --save
- npm install dotenv --save

- npm install mongoose --save
- npm install cross-env // cross-platform compatibility
- npm install express-async-errors --save
- npm install bcrypt --save
- npm install jsonwebtoken --save

// REACT
- npm install --save prop-types



# Dev
- npm install eslint --save-dev
- npm install nodemon --save-dev
- npm install --save-dev jest
- npm install --save-dev supertest
- npm install --save mongoose-unique-validator
- npm install --save-dev @testing-library/react @testing-library/jest-dom



## Package.json 
```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js",
    "lint": "eslint ."
  },
```

### JETS
```js
{
  "name": "notes-backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest --verbose"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^26.3.0",
  },
  "dependencies": {
    "express": "^4.17.1",
  },
  "jest": {
    "testEnvironment": "node"
  }
}
```

## JEST REACT
- npm install --save-dev @testing-library/react @testing-library/jest-dom
- https://fullstackopen.com/en/part5/testing_react_apps
- The beforeEach function gets called before each test, which then renders the Togglable component into the component variable

### // TEST
- CI=true npm test -- --coverage



```js
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note} />
  )

  const li = component.container.querySelector('li')
  console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = getByText('make not important')

  fireEvent.click(button)
  fireEvent.click(button)


  expect(mockHandler.mock.calls.length).toBe(1)
})
```
- const button = component.container.querySelector('button')

```js
const button = component.container.querySelector('button')
```


# [userAdmin](https://fullstackopen.com/en/part4/user_administration#populate)
- [github](https://github.com/kelektiv/node.bcrypt.js)
- one way HASH
```
npm install --save mongoose-unique-validator
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
# web token 
- allows us to generate JSON web tokens
 Mac 
- npm install bcrypt --save
 Window 
npm install bcryptjs --save 

- npm install jsonwebtoken --save

https://jwt.io/