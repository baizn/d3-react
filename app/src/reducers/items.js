
import actionType  from '../constants/actionType'
const { LOAD_PIE } = actionType

let defaultState = {}
export default function (state = defaultState, action) {
  switch(action.type) {
    case LOAD_PIE:
      return action.response
    default:
      return state
  }
}
