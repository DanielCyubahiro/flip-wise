import { AlignJustify } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'
import { StyledButton } from '@/components/StyledButton'

const StyledMenu = styled.ul`
  position: absolute;
  top: 3.5rem;
  right: 1.5rem;
  background: var(--color-button-one);
  border: 3px solid #cccccc;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  border-radius: 0.2rem;
  z-index: 100;
  padding: 0.5rem;
  color: white;
`

const StyledMenuItem = styled.li`
  list-style: none;
  &:hover {
    cursor: pointer;
  }
`

const SideMenu = ({ onCreate }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  const handleCreate = () => {
    setIsOpen(false)
    onCreate((prevState) => !prevState)
  }

  const handleToggleMusic = () => {
    const audio = window.backgroundMusic
    if (!audio) return

    if (audio.paused) {
      audio.play()
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }

    setIsOpen(false)
  }

  return (
    <>
      <StyledButton $variant="sideMenu" onClick={() => setIsOpen(!isOpen)}>
        <AlignJustify />
      </StyledButton>
      {isOpen && (
        <StyledMenu>
          <StyledMenuItem onClick={handleCreate}>Create</StyledMenuItem>
          <StyledMenuItem onClick={handleToggleMusic}>
            {isPlaying ? 'Pause Music' : 'Play Music'}
          </StyledMenuItem>
        </StyledMenu>
      )}
    </>
  )
}

export default SideMenu
