import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const getId = () => (1e5 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      return state.map(anecdote => {
        if (anecdote.id === action.payload) {
          anecdoteService.updateVote(anecdote)
          return {...anecdote, votes: anecdote.votes + 1}
        } else {
          return anecdote
        }
      })
      .sort((a, b) => b.votes - a.votes)
    },
    createEntry(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVote, createEntry, setAnecdotes } = anecdoteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer