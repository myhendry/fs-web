import React from "react"

import { Container } from "../components/common"
import { handleAuthentication } from "../utils/auth0/auth"

const Callback = () => {
  handleAuthentication()

  return (
    <Container>
      <p>Loading...</p>
    </Container>
  )
}

export default Callback
