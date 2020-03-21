import { combineReducers } from "redux"

import testReducer from "./testReducer"

export default combineReducers({
  // demo: () => []
  test: testReducer,
})
