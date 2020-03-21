import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"

import { client } from "./src/utils/apollo/client"
import { silentAuth } from "./src/utils/auth0/auth"
import ReduxWrapper from "./src/utils/redux/ReduxWrapper"
import Layout from "./src/components/layout"

class SessionCheck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  handleCheckSession = () => {
    this.setState({ loading: false })
  }

  componentDidMount() {
    silentAuth(this.handleCheckSession)
  }

  render() {
    return (
      this.state.loading === false && (
        <React.Fragment>{this.props.children}</React.Fragment>
      )
    )
  }
}

export const wrapRootElement = props => {
  return (
    <SessionCheck>
      <ApolloProvider client={client}>
        <ReduxWrapper {...props} />
      </ApolloProvider>
    </SessionCheck>
  )
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
