
# 5.12: Blog list frontend, step12
Add ESlint to the project. Define the configuration according to your liking. Fix all of the linter errors.

Create-react-app has installed ESlint to the project by default, so all that's left for you to do is to define your desired configuration in the .eslintrc.js file.

NB: do not run the eslint --init command. It will install the latest version of ESlint that is not compatible with the configuration file created by create-react-app!


## for windows 
- Inside VS Code use: Ctrl+Shift+P or Shift+Cmd+P.
- Type: Preferences: Open Settings (JSON)
- Select the option.
- Update eslint-related code inside the opened JSON file.
```js
    "eslint.workingDirectories": [{ "mode": "auto" }]
```

# 5.11: Blog list frontend, step11
Define PropTypes for one of the components of your application.

```js
  CreateForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
  }

  // CreateForm.propTypes = {
  //   createBlog: PropTypes.func.isRequired,
  //   password: PropTypes.string.isRequired
  // }

```


# 5.10*: Blog list frontend, step10
Add a new button for deleting blog posts. Also implement the logic for deleting blog posts in the backend.

```js
// App.js
  <Blog key={blog.id} initBlog={blog} updateBlog={updateBlog} />

//Blog.js
  const handleDelete = async () => {
    if (window.confirm("Do you really want to leave?")) {      
       await blogService.deleteBlog(blog.id)
       updateBlog()
    }
  }

// blogs.js
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token}
  }
  const blog = await axios.delete(`${baseUrl}/${id}`, config)
  return blog.data
}

```

# 5.9*: Blog list frontend, step9
Modify the application to list the blog posts by the number of likes. Sorting the blog posts can be done with the array sort method.
```js
  const blogList = () => {

    let sortedBlogs = blogs.sort((a, b) => a.likes - b.likes)
    
    return (
      <div>
        <h2>blogs</h2>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} initBlog={blog} />
        )}
      </div>
    )
  }
```

# 5.8*: Blog list frontend, step8
Implement the functionality for the like button. Likes are increased by making an HTTP PUT request to the unique address of the blog post in the backend.

```js

  const handleLike = async () => {
    const putBlog = await blogService.update(blog.id, {
      'user': blog.user.id,
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes + 1
    })

    setLike(putBlog.likes)
    setBlog(putBlog)
  }
```

# 5.7* Blog list frontend, step7
Let's add each blog a button, which controls if all of the details about the blog are shown or not.

```js
import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [displayAll, setDisplayAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const displayTitleAndAuthor = () => (
    <div style={blogStyle}>
      {blog.title} {blog.author} 
      <button onClick={()=>setDisplayAll(true)}>View</button>
    </div>
  )

  const displayBlog = () => (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={()=>setDisplayAll(false)}>Hide</button>
      <br></br>
      {blog.url}
      <br></br>
      {blog.likes}
      <br></br>
      {blog.author}
    </div>
  )

  return (
    <div>
      {displayAll ?  displayBlog() : displayTitleAndAuthor()}
    </div>
  )
}
export default Blog
```

Full details of the blog open when the button is clicked.

# 5.6 Blog list frontend, step6
Separate the form for creating a new blog into its own component (if you have not already done so), and move all the states required for creating a new blog to this component.

```js
// App.js

  const createForm = () => (
    <Togglable buttonLabel='new note'>
      <CreateForm
        createBlog={handleCreateBlog}>
      </CreateForm>
    </Togglable>
  )

  const handleCreateBlog = async (newBlog) => {

    console.log('newBlog', newBlog.newBlog)
    try {
      let blog = await blogService.create(newBlog)
      console.log(blog)
      setNotificationMessage(`a new blog ${blog.title} by ${blog.author}`)
      setNotificationType('success');
      // setTimeout(() => {
      //   setNotificationMessage(null)
      // }, 1000);
    } catch (exception) {
      alert('Create, Blog exception')
    }

  }


import React, { useState } from 'react'

const CreateForm  = ({createBlog}) => { 

	const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

	
  const handleCreateForm = async (event) => {
		event.preventDefault()

		  setTitle('')
      setUrl('')
      setAuthor('')

			createBlog({
				'title': title,
				'author': author,
				'url': url,
				'likes': 20
			})
	}
	
	
	return ( 
	<form onSubmit={handleCreateForm}>
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
      </form> )

}

export default CreateForm
```

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