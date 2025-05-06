import styled from 'styled-components'
import Link from 'next/link'

export const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 0.6rem;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid;
  transition: background-color 0.2s, border-color 0.2s;

  color: ${({ variant }) => (variant === 'lightBlue' ? '#1a1a1a' : 'white')};

  background-color: ${({ active, variant }) => {
    if (active) return 'blue'
    if (variant === 'lightBlue') return '#e6f4ff'
    return 'black'
  }};

  border-color: ${({ variant }) => (variant === 'lightBlue' ? '#cce0f5' : 'black')};

  &:hover {
    background-color: ${({ variant }) => (variant === 'lightBlue' ? '#9cd0fa' : '#4a4949')};
    border-color: ${({ variant }) => (variant === 'lightBlue' ? '#99ccf3' : '#1a1a1a')};
  }
`
