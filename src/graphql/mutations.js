import gql from "graphql-tag"

const ASK_PY_SENTIMENT = gql`
  mutation AskPySentiment($statement: String!) {
    askPySentiment(statement: $statement)
  }
`

const SIGNIN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(input: { email: $email, password: $password }) {
      token
    }
  }
`

const ADD_BOOK_MUTATION = gql`
  mutation ADD_BOOK($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      id
      title
    }
  }
`
export { SIGNIN_MUTATION, ADD_BOOK_MUTATION, ASK_PY_SENTIMENT }
