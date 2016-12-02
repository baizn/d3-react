
import actionType  from '../constants/actionType'
const { LOAD_PIE, LOAD_TICK_BAR } = actionType

let defaultState = {
  pie: {},
  tickBar: []
}
export default function (state = defaultState, action) {
  switch(action.type) {
    case LOAD_PIE:
      return Object.assign({}, defaultState.pie, action.response)
    case LOAD_TICK_BAR:
      return action.response
    default:
      return state
  }
}
