import * as React from 'react';

import { Breakpoints } from '../types';
import { useViewport } from '../hooks';

type BreakpointString = 's|m' | 'm|l' | 'l|xl' | 'm|l|xl';

interface ViewportProps {
  children?: React.ReactNode;
  /** Breakpoint(s) criteria where UiViewport render it children see [Breakpoints Enum](./packages-foundation-docs-breakpoints) */
  criteria: Breakpoints | BreakpointString;
}

export const UiViewport: React.FC<ViewportProps> = ({ children, criteria }) => {
  const { isSmall, isMedium, isLarge, isXLarge } = useViewport();
  const childrenMemo = React.useMemo(() => <>{children}</>, [children]);

  if (isSmall) {
    const matchesCriteria = criteria === Breakpoints.SMALL || criteria === 's|m';
    if (matchesCriteria) {
      return childrenMemo;
    }
  }

  if (isMedium) {
    const matchesCriteria =
      criteria === Breakpoints.MEDIUM || criteria === 's|m' || criteria === 'm|l' || criteria === 'm|l|xl';

    if (matchesCriteria) {
      return childrenMemo;
    }
  }

  if (isLarge) {
    const matchesCriteria =
      criteria === Breakpoints.LARGE || criteria === 'm|l' || criteria === 'l|xl' || criteria === 'm|l|xl';

    if (matchesCriteria) {
      return childrenMemo;
    }
  }

  if (isXLarge) {
    const matchesCriteria = criteria === Breakpoints.XLARGE || criteria === 'l|xl' || criteria === 'm|l|xl';

    if (matchesCriteria) {
      return childrenMemo;
    }
  }

  return null;
};

UiViewport.displayName = 'UiViewport';
