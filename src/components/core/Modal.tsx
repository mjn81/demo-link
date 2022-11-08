import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { HTMLAttributes } from 'react';
import { Portal } from 'react-portal';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  className,
  ...others
}: ModalProps) => {
  return (
    <Portal node={document && document.querySelector('#modal-layer')}>
      <div className={`modal ${isOpen ? 'open' : 'close'} ${className ?? ''}`} {...others}>
        <div className="content">
          <header className="title">
            <h3>{title}</h3>
            <button className="plain" onClick={onClose}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </header>
          <div className="body">{children}</div>
        </div>
      </div>
    </Portal>
  );
};
