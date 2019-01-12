// STATE INITIAL
const initialState = {
  strikeNumber: 5
}

//ACTION TYPES
const UPDATE_STRIKES = "UPDATE_STRIKES";

//REDUCER CASES
function reducer(state = initialState,  action) {
  switch(action.type) {
    case UPDATE_STRIKES:
      return Object.assign({}, state, {strikeNumber: action.payload})

        default: return state
  }
}

//ACTION CREATOR
export function strikeUpdater(strikeCount) {
  return {
    type: UPDATE_STRIKES,
    payload:  strikeCount

  }
}

export default reducer