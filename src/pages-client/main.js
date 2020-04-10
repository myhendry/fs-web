import React, { useEffect } from "react"
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import styled from "styled-components"

import { Container, ErrorMessage, Button } from "../components/common"
import { GET_BOOKS_QUERY } from "../graphql/queries"
import { ADD_BOOK_MUTATION } from "../graphql/mutations"
import { BOOK_ADDED_SUBSCRIPTION } from "../graphql/subscriptions"

const Main = () => {
  const [addBook, { data: dataPostMutation }] = useMutation(ADD_BOOK_MUTATION)
  const { loading, error, data, subscribeToMore } = useQuery(GET_BOOKS_QUERY)
  const { data: subscribedData, loading: subscribedLoading } = useSubscription(
    BOOK_ADDED_SUBSCRIPTION
  )

  console.log(subscribedData, subscribedLoading)

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

  const handleSubmit = async (
    { title, author },
    { resetForm, setSubmitting, setErrors }
  ) => {
    try {
      setSubmitting(true)
      // setTimeout(() => {
      //   console.log("yes")
      // }, 3000)
      await addBook({
        variables: { title, author },
        // refetchQueries: [{ query: GET_BOOK_QUERY }],
      })
      resetForm({})
    } catch (error) {
      resetForm()
      setSubmitting(false)
      setErrors(error)
    }
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    author: Yup.string()
      .min(3)
      .required(),
  })

  return (
    <Container>
      <h1>Add</h1>
      <Formik
        initialValues={{
          title: "",
          author: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          isSubmitting,
          isValid,
        }) => (
          <Form onSubmit={handleSubmit}>
            <FormField>
              <FormikField name="title" placeholder="Title" />
              {errors.title && touched.title && (
                <ErrorMessage>{errors.title}</ErrorMessage>
              )}
            </FormField>
            <FormField>
              <FormikField name="author" placeholder="Author" />
              {errors.author && touched.author && (
                <ErrorMessage>{errors.author}</ErrorMessage>
              )}
            </FormField>

            {errors.message && <ErrorMessage>Unable to Submit</ErrorMessage>}

            <Button disabled={!isValid || isSubmitting}>Submit</Button>
          </Form>
        )}
      </Formik>

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

const FormField = styled.div``

const FormikField = styled(Field)`
  display: block;
  width: 50%;
  padding: 8px;
  font-size: 14px;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: none;
  &:focus,
  &:active {
    border: 1px solid rebeccapurple;
  }
`

export default Main
