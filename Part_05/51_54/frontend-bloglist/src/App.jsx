import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import BlogForm from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [URL, setURL] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [regMessage, setRegMessage] = useState(null)
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
  
  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {

      const blogObj = {
        title,
        author,
        url: URL,
        userId: user.id,
        user,
        id: `${Math.ceil(Math.random() * 1000000)}`
      }
      await blogService.create(blogObj)
      setBlogs(blogs.concat(blogObj))
      setRegMessage(`"${blogObj.title}" by ${blogObj.author} added`)
      setTimeout(() => {
        setRegMessage(null)
      }, 5000)
    } catch(error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
    setUsername('')
    setPassword('')
  }

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
        <h2>create new</h2>
        <BlogForm
          onSubmit={handleNewBlog}
          title={title}
          titleOnChange={({target}) => setTitle(target.value)}
          author={author}
          authorOnChange={({target}) => setAuthor(target.value)}
          URL={URL}
          URLOnChange={({target}) => setURL(target.value)}
        />

      </div>
    }
      <h2>The Blogs{user !== null ? ` of ${user.name}` : ''}</h2>
    {
      user === null ? (
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      )
      :(
        blogs.filter(blog => blog.user && blog.user.name === user.name).map(blog => <Blog key={blog.id} blog={blog} />)
      )
    }
    </div>
  )
}

export default App