import React from 'react';
import Dialog from './Dialog';

interface ConfirmationDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ onConfirm, onCancel = () => {}, children }) => {
  const actionButtons = (
    <div className="flex w-full justify-evenly">
      <button className="btn" type="button" onClick={onCancel}>
        Cancel
      </button>
      <button className="btn btn-warning" type="button" onClick={onConfirm}>
        Confirm
      </button>
    </div>
  );

  return (
    <Dialog title="Attention" actions={actionButtons} role="alert-dialog">
      {children}
    </Dialog>
  );
};

export default ConfirmationDialog;
