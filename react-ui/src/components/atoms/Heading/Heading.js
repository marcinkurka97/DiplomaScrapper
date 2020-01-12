import styled from 'styled-components';
import { theme } from '../../../theme/mainTheme';

const Heading = styled.h1`
  font-size: ${({ big }) => (big ? theme.fontSize.xl : theme.fontSize.l)};
  font-weight: ${theme.boldFont};
`;

export default Heading;
