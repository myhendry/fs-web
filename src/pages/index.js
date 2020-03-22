import React from "react"
import { Link } from "gatsby"
import { connect } from "react-redux"

import { Container } from "../components/common"
import Image from "../components/image"
import SEO from "../components/seo"
import { toggleDarkMode } from "../redux/actions"

const IndexPage = props => {
  /*
http://localhost:8000, https://hendry-gatsby.netlify.com, http://localhost:9000, https://sad-knuth-ec815e.netlify.com
http://localhost:8000/callback, https://hendry-gatsby.netlify.com/callback, http://localhost:9000/callback, https://sad-knuth-ec815e.netlify.com/callback
*/

  return (
    <Container>
      <SEO title="Home" />
      <div>
        <button
          style={
            props.isDarkMode ? { background: "black", color: "white" } : null
          }
          onClick={() => props.dispatch(toggleDarkMode(!props.isDarkMode))}
        >
          Using Redux
        </button>
      </div>
      <div>
        <Link to="/account">Go to your account</Link>
      </div>
    </Container>
  )
}

export default connect(state => {
  return {
    isDarkMode: state.test.isDarkMode,
  }
}, null)(IndexPage)
