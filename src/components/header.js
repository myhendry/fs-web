import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import { logout, getProfile } from "../utils/auth0/auth"

const Header = ({ siteTitle }) => {
  const user = getProfile()

  return (
    <HeadSection>
      <Logo>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </Logo>
      <Intro>{user.email ? `Hi, ${user.email}` : ""}</Intro>
      <Nav>
        {user.email && (
          <>
            <StyledLink to={`/account`}>Main</StyledLink>
            <StyledLink to={`/account/settings`}>Setting</StyledLink>
            <StyledLink to={`/account/billing`}>Billing</StyledLink>
            <StyledLogout
              href="#logout"
              onClick={e => {
                logout()
                e.preventDefault()
              }}
            >
              Log Out
            </StyledLogout>
          </>
        )}
      </Nav>
    </HeadSection>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

const HeadSection = styled.div`
  background: var(--header);
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const SectionA = styled.div`
  flex: 1;
`

const Logo = styled.h1`
  color: var(--white);
`

const Intro = styled.span`
  color: var(--white);
`

const StyledLink = styled(Link)`
  color: var(--white);
  text-decoration: none;
  margin: 0 0.5rem;
`

const StyledLogout = styled.a`
  color: var(--white);
  text-decoration: none;
  margin: 0 0.5rem;
`

export default Header
