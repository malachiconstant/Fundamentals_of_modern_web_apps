import { useState } from 'react'
import Togglable from '../components/Togglable'

const ToggContent = ({props, addLike}) => {
  return (
    <>
      <p className="url">{props.url}</p>
        <p className="likes">likes {props.likes}  <button className="addlike-btn" onClick={addLike}>like</button></p>
        <p>{props.author}</p>
    </>
  )
}

const Blog = ({ blog, createLike, user, deleteBlog }) => {
  const [showDetails, setshowDetails] = useState(false)
  const blogStyle= {
    padding: '2px 4px 2px 10px', 
    border: 'solid 1px green',
    borderWidth: 1,
    marginBottom: 5
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
    <div className="blog-class" style={blogStyle}>
      <p><strong className="blog-title">{blog.title}</strong>, <span className="blog-author">{blog.author}</span></p>
      {
        showDetails ? <ToggContent props={blog} addLike={addLike} /> : ''
      }
      <button className='details-btn' onClick={() => setshowDetails(!showDetails)}>{showDetails ? 'hide details' : 'view details'}</button>

      { user && (<button onClick={() => deleteBlog(blog)}>delete</button>) }
    </div>  
  )
}

export default Blog