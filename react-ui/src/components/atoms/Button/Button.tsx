import styled from '@emotion/styled';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }: { theme: { body: string } }) => theme.body};
  text-decoration: none;
  padding: 0 25px;
  background-color: ${({
    theme,
    color,
  }: {
    theme: { body: string; backgroundDarkGray: string };
    color?: string;
  }) => color || theme.backgroundDarkGray};
  height: 40px;
  border: none;
  border-radius: 20px;
  font-weight: ${({
    theme,
    bold,
  }: {
    theme: { body: string; backgroundDarkGray: string; boldFont: number; normalFont: number };
    color?: string;
    bold?: boolean;
  }) => (bold ? theme.boldFont : theme.normalFont)};
  letter-spacing: 1px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    transform: scale(1.0125);
    transition: box-shadow, transform 0.9s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }
`;

export default Button;
