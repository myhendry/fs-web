import React, { useEffect, createRef } from "react"
import { Link } from "gatsby"
import { connect } from "react-redux"
import lottie from "lottie-web"
import styled from "styled-components"

import animation from "../animations/17895-wear-mask.json"
import { Container } from "../components/common"
import SEO from "../components/seo"
import { toggleDarkMode } from "../redux/actions"

const IndexPage = props => {
  let animationContainer = createRef()

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animation,
    })
    return () => anim.destroy() // optional clean up for unmounting
  }, [])

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
        <div>
          <Link to="/account">Go to your account</Link>
        </div>
      </div>
      <div>
        <AnimationContainer ref={animationContainer} />
      </div>
    </Container>
  )
}

const AnimationContainer = styled.div`
  width: 30rem;
  height: 30rem;
`

export default connect(state => {
  return {
    isDarkMode: state.test.isDarkMode,
  }
}, null)(IndexPage)
