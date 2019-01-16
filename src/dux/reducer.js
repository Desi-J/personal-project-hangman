// STATE INITIAL
const initialState = {
  // must be 1 to work
  strikeNumber: 1,
  wordObj: [],
  user: null
}

console.log('user: ', initialState.user)
//ACTION TYPES
const UPDATE_STRIKES = "UPDATE_STRIKES";
const UPDATE_WORD = "UPDATE_WORD";
const SET_USER = "SET_USER";

//REDUCER CASES
function reducer(state = initialState,  action) {
  switch(action.type) {
    case UPDATE_STRIKES:
      return Object.assign({}, state, {strikeNumber: action.payload})
    case UPDATE_WORD:
      return Object.assign({}, state, {wordObj: action.payload})
    case SET_USER:
      return Object.assign({}, state, {user: action.payload})

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

export function wordUpdater(randWord) {
  return {
    type: UPDATE_WORD,
    payload: randWord
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  }
}

export default reducer