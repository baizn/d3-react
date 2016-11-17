import config from '../../../config'
import actionType from '../constants/actionType'
import requestURL from '../constants/requestURL'
const { LOADED_ITEMS, LOADED_ITEMS_DETAIL, 
  LOADED_ITEM_USER, LOAD_CHART, LOAD_TEST, LOAD_NAVS } = actionType
const { LOAD_DEFAULT_CHART_URL, LOAD_ITEMS_URL, 
  LOAD_ITEMDETAIL_URL, LOAD_USER_URL, LOAD_TEST_URL, LOAD_NAVS_URL } = requestURL

const { CALL_API, CHAIN_API } = config

export function loadDefaultChartData() {
  return {
    [CALL_API]: {
      method: 'get',
      url: LOAD_DEFAULT_CHART_URL,
      successType: LOAD_CHART
    }
  }
}

export function loadTestData() {
  return {
    [CALL_API]: {
      method: 'get',
      url: LOAD_TEST_URL,
      successType: LOAD_TEST
    }
  }
}

export function loadItems() {
  return {
    [CALL_API]: {
      method: 'get',
      url: LOAD_ITEMS_URL,
      successType: LOADED_ITEMS,
      //query: params
    }
  }
}

export function loadNavs() {
  return {
    [CALL_API]: {
      method: 'get',
      url: LOAD_NAVS_URL,
      successType: LOAD_NAVS
    }
  }
}
export function loadItemDetail ({ id }) {
  return {
    [CHAIN_API]: [
      ()=> {
        return {
          [CALL_API]: {
            method: 'get',
            url: LOAD_ITEMDETAIL_URL + `/${id}`,
            successType: LOADED_ITEMS_DETAIL
          }
        }
      },
      (item) => {
        debugger
        return {
          [CALL_API]: {
            method: 'get',
            url: LOAD_USER_URL + `/${item.id}`,
            successType: LOADED_ITEM_USER
          }
        }
      }
    ]
  }
}
