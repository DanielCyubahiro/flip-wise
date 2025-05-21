import styled from 'styled-components'
import Link from 'next/link'

export const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 0.6rem;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid black;
  transition: background-color 0.2s, border-color 0.2s;

  color: white;
  background-color: ${({ $active }) => ($active ? 'blue' : 'black')};

  &:hover {
    background-color: #4a4949;
    border-color: #1a1a1a;
  }
`
