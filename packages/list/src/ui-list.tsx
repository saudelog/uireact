import React from 'react';

import styled from 'styled-components';

import { ThemeContext } from '@uireact/foundation';

import { UiListProps, privateListProps } from './types';

const UnorderedList = styled.ul<privateListProps>`
  ${(props) => `
    ${props.type === 'UNORDERED' ? 'list-style-type: none;' : ''}
  `}
`;

export const UiList: React.FC<UiListProps> = ({ children, className, type = 'UNORDERED' }: UiListProps) => {
  const themeContext = React.useContext(ThemeContext);

  switch (type) {
    case 'ORDERED':
      return <ol className={className}>{children}</ol>;
    case 'BULLETED':
      return (
        <UnorderedList
          className={className}
          customTheme={themeContext.theme}
          selectedTheme={themeContext.selectedTheme}
          type={type}
        >
          {children}
        </UnorderedList>
      );
    default:
      return (
        <UnorderedList
          className={className}
          customTheme={themeContext.theme}
          selectedTheme={themeContext.selectedTheme}
          type={type}
        >
          {children}
        </UnorderedList>
      );
  }
};

UiList.displayName = 'UiList';
