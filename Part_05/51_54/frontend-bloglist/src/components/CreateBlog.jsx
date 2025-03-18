const BlogForm = ({
  onSubmit,
  title,
  titleOnChange,
  author,
  authorOnChange,
  URL,
  URLOnChange

}) => {
  return (
    <form onSubmit={onSubmit} >
      title: <input type="text" placeholder="title" value={title} name="title" onChange={titleOnChange} required /><br /><br />
      author: <input type="text" placeholder="author" value={author} name="author" onChange={authorOnChange} required /><br /><br />
      url: <input type="text" placeholder="https://" value={URL} name="url" onChange={URLOnChange} required /><br /><br />
      <button type="submit" onSubmit={onSubmit}>create</button>
    </form>
  )
}

export default BlogForm