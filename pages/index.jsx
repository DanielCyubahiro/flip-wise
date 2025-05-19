import styled from 'styled-components';
import Login from '@/components/Login';

const StyledContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
`;
const HomePage = () => {
  return (
      <StyledContainer>
        <Login/>
      </StyledContainer>
  );
};

export default HomePage;
