import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteList = ({anecdotes, updateAnecdoteMutation}) => {
  
  const dispatch = useNotificationDispatch()

  const handleVote = async (anecdote) => {
    const newThing = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    updateAnecdoteMutation.mutate(newThing)
    console.log('vote')

    dispatch({
      type: 'SET_NOTIFICATION',
      payload: `anecdote '${anecdote.content}' voted`,
    })

    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList