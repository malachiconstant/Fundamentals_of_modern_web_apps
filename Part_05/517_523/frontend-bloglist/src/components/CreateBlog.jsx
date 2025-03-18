import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({createBlog, user
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [URL, setURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url: URL,
      likes: 0,
      userId: user.id,
      user,
      id: `${Math.ceil(Math.random() * 1000000)}`
    })
  }
  return (
    <form className="form" onSubmit={addBlog} >
      title: <input type="text" placeholder="title" value={title} name="title" onChange={event => setTitle(event.target.value)} required /><br />
      author: <input type="text" placeholder="author" value={author} name="author" onChange={event => setAuthor(event.target.value)} required /><br />
      url: <input type="text" placeholder="https://" value={URL} name="url" onChange={event => setURL(event.target.value)} required /><br />
      <button className="create-blog" type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


export default BlogForm