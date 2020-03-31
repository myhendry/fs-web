import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from "gatsby-image"

import { Container } from "../components/common"
import SEO from "../components/seo"

const Shop = () => {
  const { tours } = useStaticQuery(GET_TOURS)

  console.log("tours", tours)

  return (
    <Container>
      <SEO title="Shop" />
      <h1>Shop</h1>
      {tours &&
        tours.edges.map(({ node }) => {
          return (
            <div style={{ margin: 10 }}>
              {node.images.map(x => {
                return <Img fixed={x.fixed} />
              })}

              <p>{node.country}</p>
            </div>
          )
        })}
    </Container>
  )
}

const GET_TOURS = graphql`
  {
    tours: allContentfulTour {
      edges {
        node {
          country
          name
          price
          images {
            fixed(width: 200, height: 200) {
              ...GatsbyContentfulFixed_withWebp
            }
          }
          days
          createdAt
          start
          slug
          description {
            description
          }
          contentful_id
        }
      }
    }
  }
`

export default Shop
