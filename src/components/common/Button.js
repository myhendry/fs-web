import styled from "styled-components"

export const Button = styled.button`
  padding: 8px 20px;
  background: rebeccapurple;
  color: white;
  border-radius: 4px;
  white-space: nowrap;
  cursor: pointer;
  ${props => (props.block ? "display: block; width: 100%" : "")}
  &:hover {
    background: indigo;
  }
`
