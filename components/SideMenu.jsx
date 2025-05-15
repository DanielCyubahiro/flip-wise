import {AlignJustify} from 'lucide-react';
import {useState} from 'react';
import styled from 'styled-components';
import {StyledButton} from '@/components/StyledButton';

const StyledMenu = styled.ul`
    position: absolute;
    top: 3.5rem;
    right: 1.5rem;
    background: white;
    border: 1px solid #cccccc;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 0.5rem;
    border-radius: 0.2rem;
    z-index: 100;
    padding: 0.5rem;
`

const StyledMenuItem = styled.li`
    list-style: none;
`

const StyledSideMenuButton = styled(StyledButton)`
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    display: flex;
    place-items: center;
`

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <>
        <StyledSideMenuButton onClick={() => setIsOpen(!isOpen)}>
          <AlignJustify/>
        </StyledSideMenuButton>
        {isOpen && (
            <StyledMenu>
              <StyledMenuItem>Create</StyledMenuItem>
            </StyledMenu>
        )}
      </>
  );
};

export default SideMenu;
