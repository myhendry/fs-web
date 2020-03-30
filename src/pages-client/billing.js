import React from "react"
import { useQuery } from "@apollo/react-hooks"

import { Container } from "../components/common"
import { GET_TASKS_QUERY } from "../graphql/queries"

const Billing = () => {
  const { loading, error, data } = useQuery(GET_TASKS_QUERY)

  return (
    <Container>
      <h1>Billing</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data &&
        data.getTasks.map(x => {
          return (
            <p key={x.id}>
              {x.name} - {x.user.email}
            </p>
          )
        })}
    </Container>
  )
}

export default Billing
