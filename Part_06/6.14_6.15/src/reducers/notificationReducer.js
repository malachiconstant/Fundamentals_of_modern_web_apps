import { createSlice, current } from '@reduxjs/toolkit'
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
export default notificationSlice.reducer