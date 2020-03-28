import styled from '@emotion/styled';

export const DropdownWrapper = styled.span`
  width: 10%;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;

  select {
    height: 40px;
    background-color: ${({ theme }) => theme.backgroundDarkGray};
    color: ${({ theme }) => theme.body};
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 5px 0 rgba(0, 0, 0, 0.14);
    padding: 10px;
    border: 0;
    margin: 0;
    border-radius: 20px;
    transition: background 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);

    option {
      height: 20px;
    }
  }
`;
