import { useDispatch } from 'react-redux'
import { createEntry } from '../reducers/anecdoteReducer'
import { createNotify, destroyNotify } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const submitEntry = (event) => {
    event.preventDefault()
    const content = event.target.entry.value
    event.target.entry.value = ''
    dispatch(createEntry(content))
    dispatch(createNotify(`you created "${content}"`))
    setTimeout(() => dispatch(destroyNotify()), 5000)
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