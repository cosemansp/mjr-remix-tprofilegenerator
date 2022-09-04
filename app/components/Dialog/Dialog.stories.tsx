import * as React from 'react';
import Dialog from './Dialog';

export default {
  title: 'components/Dialog',
  component: Dialog,
};

export const Default = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button className="modal-button btn" type="button" onClick={() => setIsOpen(!isOpen)}>
        open modal
      </button>

      {isOpen && (
        <Dialog
          title="A beautiful dialog"
          actions={
            <button className="btn" type="button" onClick={() => setIsOpen(false)}>
              Close
            </button>
          }
        >
          <p className="py-4">
            You have been selected for a chance to get one year of subscription to use Wikipedia for free!
          </p>
        </Dialog>
      )}
    </>
  );
};
