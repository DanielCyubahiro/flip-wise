import styled from 'styled-components'
import { useEffect } from 'react'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [onClose])

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>{children}</ModalContainer>
    </Overlay>
  )
}
