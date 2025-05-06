import { createSlice, current } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
// import {initialState} from './anecdoteReducer'

const initialState = ''
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotify(state, action){
      return action.payload
    },
    destroyNotify(state, action) {
      return null
    } 
  }

})

export const {createNotify, destroyNotify} = notificationSlice.actions

export const setNotification = (content, duration) => {
  return (dispatch) => {
    dispatch(createNotify(content))
    setTimeout(() => dispatch(destroyNotify()), duration)
  }
}

export default notificationSlice.reducer