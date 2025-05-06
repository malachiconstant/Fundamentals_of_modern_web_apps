import { useDispatch } from 'react-redux'
import { createEntry } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const submitEntry = async (event) => {
    event.preventDefault()
    const content = event.target.entry.value
    const newAnecdote = await anecdoteService.createNew(content)
    event.target.entry.value = ''
    dispatch(createEntry(newAnecdote))
    dispatch(setNotification(`you created "${content}"`, 5000))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={submitEntry}>
        <div><input name="entry" /></div>
        <button type="submit">create</button>
      </form>
    </>

  )
}

export default AnecdoteForm