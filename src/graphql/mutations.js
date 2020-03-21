import gql from "graphql-tag"

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
export { SIGNIN_MUTATION, ADD_BOOK_MUTATION }
