import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultTheme, ThemeColor, IDialogController } from '@uireact/foundation';
import { UiDialog, useDialog } from '@uireact/dialog';

import { UiView } from '../src/ui-view';

type MockedComponentProps = {
  centeredContent?: boolean;
  className?: string;
};

const closeDialogMockedFn = jest.fn();
const openDialogMockedFn = jest.fn();

const customDialogController: IDialogController = {
  closeDialog: closeDialogMockedFn,
  openDialog: openDialogMockedFn,
  openedDialogs: [],
};

const DialogComponent = () => {
  const dialogId = 'someId';
  const { actions } = useDialog(dialogId);

  return (
    <>
      <button onClick={() => actions.openDialog()}>Open dialog</button>
      <UiDialog dialogId={dialogId}>
        <p>Dialog content</p>
        <button onClick={() => actions.closeDialog()}>Close dialog</button>
      </UiDialog>
    </>
  );
};

const MockedComponent = (props: MockedComponentProps) => (
  <UiView
    theme={DefaultTheme}
    selectedTheme={ThemeColor.dark}
    dialogController={customDialogController}
    className={props.className}
    centeredContent={props.centeredContent}
  >
    <p>Content</p>
    <DialogComponent />
  </UiView>
);

const MockedComponentWithDialog = (props: MockedComponentProps) => (
  <UiView
    theme={DefaultTheme}
    selectedTheme={ThemeColor.dark}
    className={props.className}
    centeredContent={props.centeredContent}
  >
    <p>Content</p>
    <DialogComponent />
  </UiView>
);

describe('<UiView />', () => {
  beforeEach(() => {
    closeDialogMockedFn.mockClear();
    openDialogMockedFn.mockClear();
  });

  it('renders fine', () => {
    render(<MockedComponent />);

    expect(screen.getByText('Content')).toBeVisible();
  });

  it('renders fine when is centered', () => {
    render(<MockedComponent centeredContent />);

    expect(screen.getByText('Content')).toBeVisible();
  });

  it('renders fine when is centered and xlarge', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    window.innerWidth = 1500;

    render(<MockedComponent centeredContent />);

    expect(screen.getByText('Content')).toBeVisible();
  });
  it('Should add class name', () => {
    render(<MockedComponent className="someClass" />);

    expect(screen.getByTestId('UiView')).toHaveClass('someClass');
  });

  describe('default dialog controller', () => {
    it('Should set up the default dialog controller', () => {
      render(<MockedComponentWithDialog />);

      fireEvent.click(screen.getByText('Open dialog'));

      expect(screen.getByRole('dialog')).toBeVisible();

      fireEvent.click(screen.getByText('Close dialog'));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('custom dialog controller', () => {
    it('Should set up the default dialog controller', () => {
      render(<MockedComponent />);

      fireEvent.click(screen.getByText('Open dialog'));

      expect(openDialogMockedFn).toHaveBeenCalledTimes(1);
      expect(openDialogMockedFn).toHaveBeenCalledWith('someId');
    });
  });
});
