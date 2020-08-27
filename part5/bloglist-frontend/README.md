# 5.5 Blog list frontend, step5
Change the form for creating blog posts so that it is only displayed when appropriate. Use functionality similar to what was shown earlier in this part of the course material. If you wish to do so, you can use the Togglable component defined in part 5.

```js
const createForm = () => (
    <Togglable buttonLabel='new note'>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </Togglable>
  )
  ```

# 5.4: bloglist frontend, step4
Implement notifications which inform the user about successful and unsuccessful operations at the top of the page. 

```js

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if(type === 'success'){
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  if(type === 'error'){
    return (
      <div className="error">
        {message}
      </div>
    )
  }
 
}

```


# 5.3: bloglist frontend, step3
Expand your application to allow a logged-in user to add new blogs

```js
  const handleCreate = async (event) => {
    event.preventDefault()

    const newBlog = {
      'title': title,
      'author': author,
      'url': url,
      'likes': 20
    }

    try {
      await blogService.create(newBlog)
      // setUser(user)
      setTitle('')
      setUrl('')
      setAuthor('')
    } catch (exception) {
      alert('Create, Blog exception')
    }

  }

const create = async (blogData) => {
  const config = {
    headers: { Authorization: token}
  }

  const blog = await axios.post(baseUrl, blogData, config)
  return blog.data
}
```

# 5.2: bloglist frontend, step2
Make the login 'permanent' by using the local storage. Also implement a way to log out.

```js
const handleLogout = (event) =>{
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }
```

```js

useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      // blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }

  }
  ```

# 5.1: bloglist frontend, step1
```js
import axios from 'axios'
const baseUrl = '/api/login'

const login = async credential => {
  const response = await axios.post(baseUrl, credential)
  return response.data
}

export default { login }


// 
  <div>
    {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in</p>
        {blogList()}
      </div>
    }
    </div>

```