import React from 'react';

import styled from 'styled-components';

import { useViewport, useViewportResponse } from '@uireact/foundation';

import { getGridTemplate } from './private';
import { GridBreakpointsDistribution, UiGridProps, privateGridProps } from './types';

const Div = styled.div<privateGridProps>`
  ${(props) => `
    display: ${props.inlineGrid ? 'inline-grid' : 'grid'};
    ${getGridTemplate(props.cols, props.colSize, 'cols')}
    ${getGridTemplate(props.rows, props.rowSize, 'rows')}
    ${props.justifyItems ? `justify-items: ${props.justifyItems};` : ''}
    ${props.colsGap ? `column-gap: ${props.colsGap}px;` : ''}
    ${props.rowsGap ? `row-gap: ${props.rowsGap}px;` : ''}
    ${props.autoFlow ? `grid-auto-flow: ${props.autoFlow};` : ''}
    ${props.gridWidth ? `width: ${props.gridWidth};` : ''}
    ${props.gridHeight ? `height: ${props.gridHeight};` : ''}
  `}
`;

const getSpanValueFromBreakpoint = (
  viewport: useViewportResponse,
  gridBreakpointsDistribution: GridBreakpointsDistribution
): number => {
  if (viewport.isSmall) {
    return gridBreakpointsDistribution.small;
  }

  if (viewport.isMedium) {
    return gridBreakpointsDistribution.medium;
  }

  if (viewport.isLarge) {
    return gridBreakpointsDistribution.large;
  }

  // istanbul ignore next
  if (viewport.isXLarge) {
    return gridBreakpointsDistribution.xlarge;
  }

  // istanbul ignore next
  return 1;
};

export const UiGrid: React.FC<UiGridProps> = (props: UiGridProps) => {
  const viewport = useViewport();
  const cols = !props.cols
    ? 1
    : typeof props.cols === 'number'
    ? props.cols
    : getSpanValueFromBreakpoint(viewport, props.cols);
  const rows = !props.rows
    ? 1
    : typeof props.rows === 'number'
    ? props.rows
    : getSpanValueFromBreakpoint(viewport, props.rows);

  return (
    <Div
      autoFlow={props.autoFlow}
      className={props.className}
      cols={cols}
      colsGap={props.colsGap}
      colSize={props.colSize}
      gridHeight={props.gridHeight}
      gridWidth={props.gridWidth}
      inlineGrid={props.inlineGrid}
      justifyItems={props.justifyItems}
      rows={rows}
      rowsGap={props.rowsGap}
      rowSize={props.rowSize}
    >
      {props.children}
    </Div>
  );
};

UiGrid.displayName = 'UiGrid';
