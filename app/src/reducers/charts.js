import _ from 'lodash'
import Immutable from 'immutable'
import actionType from '../constants/actionType'
const { LOAD_CHART, LOAD_TEST, LOAD_NAVS } = actionType

let initialState = Immutable.fromJS({
    test: {},
    navs: []
})

export default function (state = initialState, action) {
    switch(action.type) {
        case LOAD_CHART:
            return state.merge(action.response)//Immutable.fromJS(action.response)
        case LOAD_TEST:
            return state.merge({test: action.response})
        case LOAD_NAVS:
            return state.merge({navs: action.response})
        default:
            return state
    }
} 