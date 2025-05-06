import PropTypes from 'prop-types'


const AnecdoteForm = ({ newAnecdoteMutation }) => {

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content, votes: 0 })
    } else {
      newAnecdoteMutation.mutate(null)
        
    }
    
    
    console.log(content.length)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

AnecdoteForm.propTypes = {
  newAnecdoteMutation: PropTypes.shape({
    mutate: PropTypes.func.isRequired,
  }).isRequired,
}
export default AnecdoteForm
