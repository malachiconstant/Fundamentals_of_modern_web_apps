const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

let userToken, id

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Jesus',
        username: 'admin3',
        password: 'admin3'
      }
    })

    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    const userName = page.getByText('username')
    const passWord = page.getByText('password')
    await expect(userName).toBeVisible()
    await expect(passWord).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'admin3', 'admin3')

      await expect(page.getByText('Jesus is logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'admin4', 'admin4')
      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(page.getByText('Jesus is logged-in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'admin3', 'admin3')
    })

    test('a new blog can be created', async ({ page }) => {
      const newBlog = page.locator('.blog-title')
      await createNote(page, 'new entry', 'new author', 'https://google.com')
      await expect(newBlog.getByText('new entry')).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {

      await createNote(page, 'another entry', 'another author', 'https://yahoo.com')

      await page.reload({ waitUntil: 'load' })

      await page.locator('.details-btn').waitFor()
      await page.getByRole('button', { name: 'view details' }).click()

      await page.locator('.addlike-btn').waitFor()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes 1')).toBeVisible()

    })
  })

  describe('User views', async () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'admin3', 'admin3')
      await createNote(page, 'title added by admin3', 'author added by admin3', 'https://alta-vista.com')
    })

    test('user who added blog sees delete button', async ({ page }) => {
      await page.locator('.details-btn').waitFor()
      await expect(page.getByText('delete')).toBeVisible()
    })

    test('user who did not add the blog will not see the delete button', async ({ page }) => {

      await page.getByRole('button', { name: 'logout' }).click()

      const blogClass = page.locator('.blog-class')
      await blogClass.waitFor()
      await expect(blogClass.getByText('delete')).not.toBeVisible()

    })
  })

  describe('Likes Order', async () => {
    beforeEach(async ({page, request}) => {
      const response = await request.post('/api/login', {
        data: {
          username: 'admin3',
          password: 'admin3',
        },
      });

      const responseBody = await response.json()
      userToken = responseBody.token
      id = responseBody.id

      const response2 = await request.post('/api/blogs', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        data: {
          title: 'Title A',
          author: 'Author A',
          url: 'https://example.com',
          likes: 1,
          userId: id
        },
      })

      const response3 = await request.post('/api/blogs', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        data: {
          title: 'Title B',
          author: 'Author B',
          url: 'https://example2.com',
          likes: 3,
          userId: id
        },
      })

      const response4 = await request.post('/api/blogs', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        data: {
          title: 'Title C',
          author: 'Author C',
          url: 'https://example3.com',
          likes: 2,
          userId: id
        },
      })

      await page.reload({ waitUntil: 'load' })
    })

    test('most likes are at the top ', async ({ page }) => {
      const firstView = page.locator(':nth-match(:text("view details"), 1)')
      const theLike = page.locator('.likes')

      await firstView.click()
      await theLike.waitFor()
      await expect(page.getByText('likes 3')).toBeVisible()

    })

    test('least likes are at the bottom ', async ({ page }) => {
      const lastView = page.locator(':nth-match(:text("view details"), 3)')
      const theLike = page.locator('.likes')

      await lastView.click()
      await theLike.waitFor()
      await expect(page.getByText('likes 1')).toBeVisible()

    })

  })



})