# 5.2: bloglist frontend, step2
Make the login 'permanent' by using the local storage. Also implement a way to log out.

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