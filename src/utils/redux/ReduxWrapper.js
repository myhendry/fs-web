import React from "react"
import { Provider } from "react-redux"

import { configureStore } from "./configureStore"

export default ({ element }) => (
  <Provider store={configureStore()}>{element}</Provider>
)
