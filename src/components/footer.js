import React from "react"

import styled from "styled-components"

const Footer = () => {
  return (
    <FooterSection>
      © {new Date().getFullYear()}, Built by
      {` `}
      <a href="https://github.com/myhendry">Hendry</a>
    </FooterSection>
  )
}

const FooterSection = styled.footer`
  text-align: center;
`

export default Footer
