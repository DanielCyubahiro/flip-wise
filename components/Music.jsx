import styled from 'styled-components'
import { useEffect, useRef } from 'react'

const BackgroundMusic = styled.audio`
  display: none;
`

export default function Music() {
  const audioRef = useRef(null)
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.5
      audio.loop = true
      audio.autoplay = true
      window.backgroundMusic = audio

      audio.play().catch(() => {
        console.log('Autoplay blocked')
      })
    }
  }, [])

  return (
    <BackgroundMusic ref={audioRef} autoPlay loop style={{ display: 'none' }}>
      <source src="/audio/HP-theme.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </BackgroundMusic>
  )
}
