import React from 'react';

interface DialogProps {
  /**
   * Title of the dialog
   */
  title: string;
  /**
   * Content of the dialog
   */
  children: React.ReactNode;
  /**
   * Actions of the dialog
   */
  actions: React.ReactNode;
  /**
   * Role of the dialog
   * @default 'dialog'
   */
  role?: string;
}

const Dialog: React.FC<DialogProps> = ({ title, children, actions, role = 'dialog' }) => (
  <div className="modal modal-open" role={role} aria-labelledby="dialog-label" aria-describedby="dialog-description">
    <div className="modal-box">
      <h3 className="text-lg font-bold" id="dialog-label">
        {title}
      </h3>
      <div id="dialog-description">{children}</div>
      <div className="modal-action">{actions}</div>
    </div>
  </div>
);

export default Dialog;
