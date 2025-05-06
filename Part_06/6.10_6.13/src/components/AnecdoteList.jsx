import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotify, destroyNotify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(item => item.content.match(filter.payload) ? item : '')
  })
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(createNotify(`you voted for "${content}"`))
    setTimeout(() => dispatch(destroyNotify()), 5000)
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