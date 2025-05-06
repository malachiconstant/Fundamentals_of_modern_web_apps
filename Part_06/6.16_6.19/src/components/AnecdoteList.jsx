import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(item => item.content.match(filter.payload) ? item : '')
  })
  const dispatch = useDispatch()

  const vote = async (id, content) => {
    dispatch(addVote(id))
    dispatch(setNotification(`you voted for "${content}"`, 5000))

  }

  return (
    <>
      {anecdotes.map(anecdote => {
        return (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )
      }

      )}
    </>

  )
}

export default AnecdoteList