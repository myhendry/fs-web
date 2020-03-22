import React from "react"
import { Router } from "@reach/router"
import { login, isAuthenticated, getProfile } from "../utils/auth0/auth"

import Main from "../pages-client/main"
import Billing from "../pages-client/billing"
import Settings from "../pages-client/settings"

const Account = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <Router>
      <Main path="/account" user={user} />
      <Settings path="/account/settings" />
      <Billing path="/account/billing" />
    </Router>
  )
}

export default Account
