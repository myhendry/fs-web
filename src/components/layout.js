import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { createGlobalStyle } from "styled-components"

import Header from "./header"
import Footer from "./footer"

const GlobalStyle = createGlobalStyle`
  :root {
    --header: rebeccapurple;
    --primary: #ddd;
    --secondary: #ccc;
    --dark: #333;
    --light: #fff;
    --white: #fff;
    --ultra: #f8f8f8;
    --bilboard: #330000;
    --shadow: 0 1px 5px rgba(104, 104, 104, 0.8);
  }

*, *::after, *::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}

body {
  background-color: var(--white);
  font-family: Poppins, Lato, sans-serif;
  box-sizing: border-box;
  line-height: 1.7;
}
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyle />

      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
