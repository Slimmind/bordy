import React, { useContext } from 'react';
import classNames from 'classnames';
import { DarkModeContext } from '../../context/dark-mode-context';

import './modal.styles.scss';

export const Modal = ({
  title,
  isOpen,
  closeModalHandler,
  children,
  modifier,
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const closeModal = () => {
    closeModalHandler();
  };

  return (
    <dialog
      open={isOpen}
      className={classNames('modal-wrap', { dark: darkMode }, modifier)}>
      <div className="modal-overlay" onClick={closeModal} />
      <div className="modal">
        <header className="modal-header">
          {title && <h2>{title}</h2>}
          <button
            className="circle-btn danger close"
            aria-label="close modal button"
            onClick={closeModal}
          ></button>
        </header>
        <div className="modal-content">{children}</div>
      </div>
    </dialog>
  );
};
