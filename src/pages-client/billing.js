import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import styled from "styled-components"

import { Container, ErrorMessage, Button } from "../components/common"
import { ASK_PY_SENTIMENT } from "../graphql/mutations"

const Billing = () => {
  const [sentiment, setSentiment] = useState("")
  const [askPySentiment] = useMutation(ASK_PY_SENTIMENT)

  const handleSubmit = async (
    { statement },
    { resetForm, setSubmitting, setErrors }
  ) => {
    try {
      setSentiment("")
      setSubmitting(true)
      const res = await askPySentiment({
        variables: { statement },
        // refetchQueries: [{ query: GET_BOOK_QUERY }],
      })
      const sentimentRes = res.data.askPySentiment || ""
      setSentiment(sentimentRes)
      resetForm({})
    } catch (error) {
      resetForm()
      setSubmitting(false)
      setErrors(error)
    }
  }

  const validationSchema = Yup.object().shape({
    statement: Yup.string()
      .min(5)
      .required(),
  })

  return (
    <Container>
      <h1>Billing</h1>
      {sentiment && <h2>The sentiment is {sentiment}</h2>}
      <Formik
        initialValues={{
          statement: "",
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
              <FormikField name="statement" placeholder="Statement" />
              {errors.statement && touched.statement && (
                <ErrorMessage>{errors.statement}</ErrorMessage>
              )}
            </FormField>
            {errors.message && <ErrorMessage>Unable to Submit</ErrorMessage>}
            <Button disabled={!isValid || isSubmitting}>Submit</Button>
          </Form>
        )}
      </Formik>
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

export default Billing
