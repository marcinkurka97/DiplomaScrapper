import styled from '@emotion/styled';

export const LinkItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }: { theme: { body: string } }) => theme.body};
  margin: 0 0 0 50px;

  svg {
    margin: 0 10px 0 0;
  }

  &:hover {
    cursor: pointer;
  }
`;
