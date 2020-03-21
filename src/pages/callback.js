import React from "react"
import { handleAuthentication } from "../utils/auth0/auth"

const Callback = () => {
  handleAuthentication()

  return <p>Loading...</p>
}

export default Callback
