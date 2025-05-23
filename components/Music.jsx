import styled from 'styled-components'

const BackgroundMusic = styled.audio`
  display: none;
`

export default function Music() {
  return (
    <audio autoPlay loop style={{ display: 'none' }}>
      <source src="/sound/HP-theme.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  )
}
