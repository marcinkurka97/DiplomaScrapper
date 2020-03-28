import styled from '@emotion/styled';
import Button from '../../atoms/Button/Button';

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 12.5vh;
  background: ${({ theme }) => theme.backgroundDarkGray};
  transition: background 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 0 30px;
`;

export const Logo = styled.div`
  width: 200px;
  height: 8vh;
  background-repeat: no-repeat !important;
  background-size: contain !important;
  background-position: center center !important;
`;

export const LoginPanel = styled.div`
  display: flex;
`;

export const StyledButton = styled(Button)`
  margin: 0 10px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 5px 0 rgba(0, 0, 0, 0.04);
`;

export const NavPanel = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 8vh;
    width: 8vh;
    margin: 0 25px 0 0;
  }
`;
