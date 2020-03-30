import styled from 'styled-components';
import { theme } from '../../../theme/mainTheme';

const Paragraph = styled.p`
  font-size: ${theme.fontSize.s};
  font-weight: ${({ normalFont }: { normalFont?: number }) => normalFont};
`;

export default Paragraph;
