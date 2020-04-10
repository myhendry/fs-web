import gql from "graphql-tag"

const GET_BOOKS_QUERY = gql`
  query GetBooks {
    getBooks {
      id
      title
      author
    }
  }
`

const GET_TASKS_QUERY = gql`
  query GetTasks {
    getTasks {
      id
      name
      user {
        id
        email
      }
    }
  }
`

export { GET_BOOKS_QUERY, GET_TASKS_QUERY }
