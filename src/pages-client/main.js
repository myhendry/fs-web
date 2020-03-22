import React, { useEffect } from "react"
import { Link } from "gatsby"
import { useQuery, useSubscription } from "@apollo/react-hooks"

import { Container } from "../components/common"
import { GET_BOOKS_QUERY } from "../graphql/queries"
import { BOOK_ADDED_SUBSCRIPTION } from "../graphql/subscriptions"

const Main = () => {
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
              ...prev.getBooks,
              {
                ...newBook,
              },
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
      <h1>Using Apollo GraphQL Client</h1>
      <h4>New info: {!subscribedLoading && subscribedData.bookAdded.title}</h4>
      <h5>
        GraphQL Server on{" "}
        <a
          href="https://hendry-gql-server.herokuapp.com/graphql"
          target="blank"
        >
          Hendry's GraphQL Server
        </a>
      </h5>
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
