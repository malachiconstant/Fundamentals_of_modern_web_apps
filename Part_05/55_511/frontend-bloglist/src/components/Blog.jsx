import { useState } from 'react'

const Blog = ({ blog, createLike, user, deleteBlog }) => {

    const [visible, setVisible] = useState(false)
  
    const toggleVisibility = () => {
      setVisible(!visible)
    }
  
  const blogStyle= {
    padding: '2px 4px 2px 10px', 
    border: 'solid 1px green',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggStyle = {
    display: `${visible ? 'block' : 'none'}`
  }

  const addLike = () =>{
    const { title,author,url,likes, id } = blog
    createLike({
      id,
      title,
      author,
      url,
      likes: likes + 1,
      user: blog.user
    })
  }

  return (
    <div style={blogStyle}>
      <p><strong>{blog.title}</strong>, {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button></p>
      <div style={toggStyle}>
        <p>{blog.url}</p>
        <p>likes {blog.likes}  <button onClick={addLike}>like</button></p>
        <p>{blog.author}</p>
      </div>
      { user && (<button onClick={() => deleteBlog(blog)}>delete</button>) }
    </div>  
  )
}

export default Blog