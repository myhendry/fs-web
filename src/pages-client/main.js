import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks"

import {
  Container,
  Form,
  FormField,
  Input,
  ErrorMessage,
  Button,
} from "../components/common"
import { GET_BOOKS_QUERY } from "../graphql/queries"
import { ADD_BOOK_MUTATION } from "../graphql/mutations"
import { BOOK_ADDED_SUBSCRIPTION } from "../graphql/subscriptions"

const Main = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [success, setSuccess] = useState(false)

  const [addBook, { data: dataPostMutation }] = useMutation(ADD_BOOK_MUTATION)
  const { loading, error, data, subscribeToMore } = useQuery(GET_BOOKS_QUERY)
  const { data: subscribedData, loading: subscribedLoading } = useSubscription(
    BOOK_ADDED_SUBSCRIPTION
  )

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: BOOK_ADDED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev
        }

        const newBook = subscriptionData.data.bookAdded

        if (!prev.getBooks.find(b => b.id === newBook.id)) {
          return {
            ...prev,
            getBooks: [
              {
                ...newBook,
              },
              ...prev.getBooks,
            ],
          }
        }
      },
    })

    return () => {
      unsubscribe()
    }
  }, [subscribeToMore])

  return (
    <Container>
      <h1>Add</h1>
      <Form
        onSubmit={e => {
          e.preventDefault()
          console.log(title, author)
          addBook({
            variables: { title, author },
            // refetchQueries: [{ query: GET_BOOK_QUERY }],
          }).then(() => {
            setTitle("")
            setAuthor("")
          })
        }}
      >
        <FormField>
          <Input
            placeholder="Title"
            value={title}
            onChange={e => {
              e.persist()
              setSuccess(false)
              setTitle(e.target.value)
            }}
          />
        </FormField>
        <FormField>
          <Input
            placeholder="Author"
            value={author}
            onChange={e => {
              e.persist()
              setSuccess(false)
              setAuthor(e.target.value)
            }}
          />
        </FormField>
        {!!success && <span>New Book Added Successfully</span>}
        <Button block type="submit">
          Add New Book
        </Button>
      </Form>
      <h1>Subscriptions</h1>
      <h5>
        GraphQL Server on{" "}
        <a
          href="https://hendry-gql-server.herokuapp.com/graphql"
          target="blank"
        >
          Hendry's GraphQL Server
        </a>
      </h5>
      <h2>New info: {!subscribedLoading && subscribedData.bookAdded.title}</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data &&
        data.getBooks.map((x, index) => {
          return (
            <p key={index}>
              {x.title} - {x.author}
            </p>
          )
        })}
    </Container>
  )
}

export default Main
