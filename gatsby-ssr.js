const React = require("react")
const { ApolloProvider } = require("@apollo/react-hooks")

const Layout = require("./src/components/layout").default
const ReduxWrapper = require("./src/utils/redux/ReduxWrapper").default
const client = require("./src/utils/apollo/client")

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export const wrapRootElement = props => {
  return (
    <ApolloProvider client={client}>
      <ReduxWrapper {...props} />
    </ApolloProvider>
  )
}
