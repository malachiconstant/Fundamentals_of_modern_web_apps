import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title and author but not url and likes', () => {
  const blog = {
    title: 'hello world',
    author: 'Jon jon',
    url: 'https://google.com',
    likes: 8
  }

  const { container } = render(<Blog blog={blog} />)
  const strong = container.querySelector('.blog-title')
  const span = container.querySelector('.blog-author')
  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')

  expect(strong).toHaveTextContent('hello world')
  expect(span).toHaveTextContent('Jon jon')

  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('renders url and likes when showDetails is true', async () => {
  const blog = {
    title: 'hello world',
    author: 'Jon jon',
    url: 'https://google.com',
    likes: 8
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = container.querySelector('.details-btn')
  await user.click(button)

  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')

  expect(url).toHaveTextContent('https://google.com')
  expect(likes).toHaveTextContent('likes 8')
})

test('ensures if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const blog = {
    title: 'hello world',
    author: 'Jon jon',
    url: 'https://google.com',
    likes: 8
  }

  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} createLike={mockHandler} />)

  const user = userEvent.setup()
  const detailsButton = container.querySelector('.details-btn')
  await user.click(detailsButton)

  const likeButton = container.querySelector('.addlike-btn')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})

