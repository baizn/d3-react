import config from '../../../config'
import actionType from '../constants/actionType'
import requestURL from '../constants/requestURL'
const { LOAD_PIE } = actionType
const { LOAD_PIE_URL } = requestURL

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
