import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { LinkItemContainer } from './LinkItem.style';
import { LinkItemProps } from './LinkItem.types';

const LinkItems: React.FC<LinkItemProps> = ({ icon, linkTitle }) => {
  return (
    <LinkItemContainer>
      <FontAwesomeIcon icon={icon} />
      <Paragraph>{linkTitle}</Paragraph>
    </LinkItemContainer>
  );
};

export default LinkItems;
