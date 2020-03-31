import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from "gatsby-image"

import { Container } from "../components/common"
import SEO from "../components/seo"

const Shop = () => {
  const { tours } = useStaticQuery(GET_TOURS)

  return (
    <Container>
      <SEO title="Shop" />
      <h1>Shop</h1>
      <button className="snipcart-checkout">Click here to checkout</button>
      {tours &&
        tours.edges.map(({ node }) => {
          return (
            <div key={node.id} style={{ margin: 10 }}>
              {node.images.map((x, idx) => {
                return <Img key={idx} fixed={x.fixed} />
              })}
              <p>{node.country}</p>
              <button
                className="snipcart-add-item"
                data-item-id={node.id}
                data-item-price={node.price}
                data-item-url="https://hendry-gatsby-gql.netlify.com/shop"
                // data-item-description="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
                // data-item-image="/assets/images/starry-night.jpg"
                data-item-name={node.name}
              >
                Add to cart
              </button>
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
          id
          country
          name
          price
          images {
            fixed(width: 200, height: 200) {
              src
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
