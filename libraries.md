# Production
- npm install express --save
- npm install cors --save
- npm install dotenv --save

- npm install mongoose --save
- npm install cross-env // cross-platform compatibility
- npm install express-async-errors --save
- npm install bcrypt --save
- npm install jsonwebtoken --save






# Dev
- npm install eslint --save-dev
- npm install nodemon --save-dev
- npm install --save-dev jest
- npm install --save-dev supertest
- npm install --save mongoose-unique-validator


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