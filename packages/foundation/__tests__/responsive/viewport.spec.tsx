import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { Breakpoints, UiViewport } from '../../src';
import { BreakpointsSizes } from '../../src/responsive/breakpoints-sizes';

beforeEach(() => {
  global.innerWidth = BreakpointsSizes.l.min;
});

describe('using breakpoint enum', () => {
  test('should render correctly when criteria is Xlarge', () => {
    render(
      <UiViewport criteria={Breakpoints.XLARGE}>
        <p>Render in XLarge</p>
      </UiViewport>
    );

    expect(screen.queryByText('Render in XLarge')).not.toBeInTheDocument();

    act(() => {
      global.innerWidth = BreakpointsSizes.xl.min;
      global.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByText('Render in XLarge')).toBeVisible();
  });

  test('should render correctly when criteria is large', () => {
    render(
      <UiViewport criteria={Breakpoints.LARGE}>
        <p>Render in large</p>
      </UiViewport>
    );

    expect(screen.getByText('Render in large')).toBeVisible();

    act(() => {
      global.innerWidth = BreakpointsSizes.m.min;
      global.dispatchEvent(new Event('resize'));
    });

    expect(screen.queryByText('Render in large')).not.toBeInTheDocument();
  });

  test('should render correctly when criteria is medium', () => {
    render(
      <UiViewport criteria={Breakpoints.MEDIUM}>
        <p>Render in medium</p>
      </UiViewport>
    );

    expect(screen.queryByText('Render in medium')).not.toBeInTheDocument();

    act(() => {
      global.innerWidth = BreakpointsSizes.m.min;
      global.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByText('Render in medium')).toBeVisible();
  });

  test('should render correctly when criteria is small', () => {
    render(
      <UiViewport criteria={Breakpoints.SMALL}>
        <p>Render in small</p>
      </UiViewport>
    );

    expect(screen.queryByText('Render in small')).not.toBeInTheDocument();

    act(() => {
      global.innerWidth = BreakpointsSizes.s.max;
      global.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByText('Render in small')).toBeVisible();
  });
});

describe('using criteria string', () => {
  test('should render correctly when criteria is l|xl', () => {
    render(
      <UiViewport criteria="l|xl">
        <p>Render in large and Xlarge</p>
      </UiViewport>
    );

    expect(screen.getByText('Render in large and Xlarge')).toBeVisible();

    act(() => {
      global.innerWidth = BreakpointsSizes.xl.min;
      global.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByText('Render in large and Xlarge')).toBeVisible();

    act(() => {
      global.innerWidth = BreakpointsSizes.s.max;
      global.dispatchEvent(new Event('resize'));
    });

    expect(screen.queryByText('Render in large and Xlarge')).not.toBeInTheDocument();
  });

  test('should render correctly when criteria is m|l', () => {
    render(
      <UiViewport criteria="m|l">
        <p>Render in large and medium</p>
      </UiViewport>
    );

    expect(screen.getByText('Render in large and medium')).toBeVisible();

    act(() => {
      global.innerWidth = BreakpointsSizes.m.min;
      global.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByText('Render in large and medium')).toBeVisible();

    act(() => {
      global.innerWidth = BreakpointsSizes.s.max;
      global.dispatchEvent(new Event('resize'));
    });

    expect(screen.queryByText('Render in large and medium')).not.toBeInTheDocument();
  });

  test('should render correctly when criteria is m|s', () => {
    global.innerWidth = BreakpointsSizes.xl.min;

    render(
      <UiViewport criteria="s|m">
        <p>Render in medium and small</p>
      </UiViewport>
    );

    expect(screen.queryByText('Render in medium and small')).not.toBeInTheDocument();

    act(() => {
      global.innerWidth = BreakpointsSizes.m.min;
      global.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByText('Render in medium and small')).toBeVisible();

    act(() => {
      global.innerWidth = BreakpointsSizes.s.max;
      global.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByText('Render in medium and small')).toBeVisible();
  });
});
