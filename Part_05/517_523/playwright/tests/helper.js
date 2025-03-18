const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createNote = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByRole('textbox', {name: 'title'}).fill(title)
  await page.getByRole('textbox', {name: 'author'}).fill(author)
  await page.getByRole('textbox', {name: 'https://'}).fill(url)
  await page.locator('.create-blog').getByRole('button', {name: 'create'}).click()
}

export { loginWith, createNote }