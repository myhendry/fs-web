import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import rootReducer from "../../redux/reducers"

export const configureStore = preloadedState => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk))
}
