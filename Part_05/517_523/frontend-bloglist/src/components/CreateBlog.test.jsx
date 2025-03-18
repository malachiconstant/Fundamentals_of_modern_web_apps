import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './CreateBlog'

test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = {id: "12345"}
  const { container } = render(<BlogForm createBlog={createBlog} user={user} />)

  const userEventSetup = userEvent.setup()
  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('https://')
  const createBlogBtn = container.querySelector('.create-blog')

  await userEventSetup.type(titleInput, 'New Blog Title')
  await userEventSetup.type(authorInput, 'New Blog Author')
  await userEventSetup.type(urlInput, 'https://newblog.com')
  await userEventSetup.click(createBlogBtn)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'New Blog Title',
    author: 'New Blog Author',
    url: 'https://newblog.com',
    likes: 0,
    userId: user.id,
    user,
    id: expect.any(String)
  })
})


