import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { LinkItemContainer } from './LinkItem.style';

const LinkItems = ({ icon, linkTitle }) => {
  return (
    <LinkItemContainer>
      <FontAwesomeIcon icon={icon} />
      <Paragraph>{linkTitle}</Paragraph>
    </LinkItemContainer>
  );
};

export default LinkItems;
