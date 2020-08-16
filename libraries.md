# Production
- npm install express --save
- npm install cors --save
- npm install dotenv --save

- npm install mongoose --save
- npm install cross-env // cross-platform compatibility
- npm install express-async-errors --save



# Dev
- npm install eslint --save-dev
- npm install nodemon --save-dev
- npm install --save-dev jest
- npm install --save-dev supertest

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
