import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import BlogForm from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [regMessage, setRegMessage] = useState(null)
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    }
    )  
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const addBlog = async (blogObj) => {
    try {
      await blogService.create(blogObj)
      setBlogs(blogs.concat(blogObj))
      setRegMessage(`"${blogObj.title}" by ${blogObj.author} added`)
      setTimeout(() => {
        setRegMessage(null)
      }, 5000)

      blogFormRef.current.toggleVisibility()

    } catch(error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLike = async (likeObj) => {

    try{
      await blogService.put(likeObj)
      let tempArr = [...blogs]
      const getIndex = tempArr.findIndex(blog => blog.title === likeObj.title)
      tempArr[getIndex] = likeObj
      setBlogs(tempArr)
    } catch(error) {
      setErrorMessage(error.message)
    }

}

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setRegMessage(`Hello, ${user.name}!`)
      setTimeout(() => {
        setRegMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogObj) => {
    try {
      if(confirm(`remove ${blogObj.title} by ${blogObj.author}?`)) {
        await blogService.del(blogObj.id)
        const delArray = [...blogs]
        const getIndex = delArray.findIndex(blog => blog.id === blogObj.id)
        delArray.splice(delArray[getIndex], 1)
        setBlogs(delArray)
      }
      
    } catch(error) {
      setErrorMessage(error.message)
    }
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const blogFormRef = useRef()

  const sortedBlogs = blogs.sort(({likes: a}, {likes: b}) => b - a)

return (
    <div>
      <br />
      {
        errorMessage ? (
          <div className='error'>
            {errorMessage}
          </div>
        ) : ''
      }
            {
        regMessage ? (
          <div className='reg-message'>
            {regMessage}
          </div>
        ) : ''
      }

      { user === null ?
        (
          <LoginForm
          onSubmit={handleLogin}
          username={username}
          userOnChange={({ target }) => setUsername(target.value)}
          password={password}
          passOnChange={({ target }) => setPassword(target.value)} />  
        ) :
      <div>
        <p>{user.name} is logged-in</p><button onClick={logOut}>logout</button>
        <Togglable buttonLabel='create' ref={blogFormRef} >
          <BlogForm createBlog={addBlog} user={user} />
        </Togglable>
      </div>
    }
      <h2>The Blogs{user !== null ? ` of ${user.name}` : ''}</h2>
    { user === null ? sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} createLike={addLike} />
      ) : sortedBlogs.filter(blog => blog.user && blog.user.name === user.name).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} createLike={addLike} deleteBlog={deleteBlog} />)
    }
      
    </div>
  )
}

export default App