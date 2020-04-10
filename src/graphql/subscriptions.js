import gql from "graphql-tag"

const BOOK_ADDED_SUBSCRIPTION = gql`
  subscription BookAdded {
    bookAdded {
      id
      title
      author
    }
  }
`
export { BOOK_ADDED_SUBSCRIPTION }
