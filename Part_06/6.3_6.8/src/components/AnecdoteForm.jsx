import { useDispatch } from 'react-redux'
import { createEntry } from '../reducers/anecdoteReducer'



const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const submitEntry = (event) => {
    event.preventDefault()
    // console.log(event.target.entry.value)
    const content = event.target.entry.value
    event.target.entry.value = ''
    dispatch(createEntry(content))
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