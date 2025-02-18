import React from 'react';

import styled from 'styled-components';

import { ColorCategories, ThemeContext, getColorCategory, getThemeStyling } from '@uireact/foundation';

import { UiIconProps, privateIconProps } from './types';
import { getDynamicMapper } from './theme';
import { IconComponent } from './public';

const Span = styled.span<privateIconProps>`
  ${(props: privateIconProps) => `
    ${getThemeStyling(
      props.customTheme,
      props.selectedTheme,
      getDynamicMapper(props.category ? getColorCategory(props.category) : ColorCategories.fonts)
    )}
  `}
`;

export const UiIcon: React.FC<UiIconProps> = ({ theme, icon, size }: UiIconProps) => {
  const themeProvided = React.useContext(ThemeContext);

  return (
    <Span category={theme} customTheme={themeProvided.theme} selectedTheme={themeProvided.selectedTheme} size={size}>
      <IconComponent icon={icon} />
    </Span>
  );
};

UiIcon.displayName = 'UiIcon';
