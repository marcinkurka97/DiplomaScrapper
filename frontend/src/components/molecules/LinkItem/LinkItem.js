import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paragraph from '../../atoms/Paragraph/Paragraph';

const LinkItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.body};
  margin: 0 0 0 50px;

  svg {
    margin: 0 10px 0 0;
  }
`;

const LinkItems = ({ icon, linkTitle }) => {
  return (
    <LinkItemContainer>
      <FontAwesomeIcon icon={icon} />
      <Paragraph>{linkTitle}</Paragraph>
    </LinkItemContainer>
  );
};

export default LinkItems;
