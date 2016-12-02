import config from '../../../config'
import actionType from '../constants/actionType'
import requestURL from '../constants/requestURL'
const { LOAD_PIE, LOAD_TICK_BAR } = actionType
const { LOAD_PIE_URL, LOAD_TICK_BAR_URL } = requestURL

const { CALL_API, CHAIN_API } = config

export function loadPieData() {
  return {
    [CALL_API]: {
      method: 'get',
      url: LOAD_PIE_URL,
      successType: LOAD_PIE
    }
  }
}

export function loadTickBarData() {
  return {
    [CALL_API]: {
      method: 'get',
      url: LOAD_TICK_BAR_URL,
      successType: LOAD_TICK_BAR
    }
  }
}
