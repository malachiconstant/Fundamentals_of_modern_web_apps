
const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (listWithOneBlog) => {
  const theLikes = listWithOneBlog.map(item => {
    const container = {}
    container[item] = item
    return item.likes
  })
  const theSum = theLikes.reduce((accu,curr) => accu + curr, 0)

  return theSum
}

const mostLikes = (theBlogs) => {
  const mostLikedBlog = theBlogs.reduce((max, blog) => blog.likes > max.likes ? blog : max, theBlogs[0])

  delete mostLikedBlog._id
  delete mostLikedBlog.__v
  delete mostLikedBlog.url

  return mostLikedBlog
}

const mostBlogs = (theBlogs) => {
  const authorCounts = theBlogs.reduce((accumulator, blog) => {
    accumulator[blog.author] = (accumulator[blog.author] || 0) + 1
    return accumulator
  }, {})

  const mostFrequentAuthor = Object.keys(authorCounts).reduce((accumulator, elem) => authorCounts[accumulator] > authorCounts[elem] ? accumulator :elem)

  return {
    author: mostFrequentAuthor,
    blogs: authorCounts[mostFrequentAuthor]
  }
}

const faveBlogger = (theBlogs) => {

  const thang = theBlogs.reduce((acc, elem) => {
    const objy = {
      author: elem.author,
      likes: elem.likes
    }
    if (!acc.find(obj => obj.author === elem.author)) {
      acc.push(objy)
    } else {
      let theLikes = acc.find(obj => obj.author === elem.author).likes
      acc.find(obj => obj.author === elem.author).likes = (theLikes || 0) + elem.likes
    }
    return acc
  }, [])

  const mostLikedAuthor = thang.reduce((acc, elem) => {
    return elem.likes > acc.likes ? elem : acc
  },thang[0])

  return mostLikedAuthor
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
  faveBlogger
}