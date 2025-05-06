import { createSlice, current } from '@reduxjs/toolkit'
// import {initialState} from './anecdoteReducer'

const filterSlice = createSlice({
  name:'filter',
  initialState: [],
  reducers: {
    filterChange(state, filter) {
      return {
        payload : filter.payload
      }
    }
  }
})

export const {filterChange} = filterSlice.actions
export default filterSlice.reducer