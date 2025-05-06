
const filterReducer = (state = 'SET_FILTER', action) => {
  if (action === 'SET_FILTER') {
    return action.payload
  }
  return action
}

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  }
}

export default filterReducer