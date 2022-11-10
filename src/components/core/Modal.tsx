import React, { HTMLAttributes, ReactNode } from 'react';
import { Portal } from 'react-portal';
import BackSvg from 'assets/icons/back.svg';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  header?: string | ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  className,
  header,
  ...others
}: ModalProps) => {
  return (
    <Portal node={document && document.querySelector('#modal-layer')}>
      <div
        className={`modal ${isOpen ? 'open' : 'close'} ${className ?? ''}`}
        {...others}
      >
        <div className="content">
          <header className="header">
            {header}
            <img src={BackSvg} alt="back" className='pointer' onClick={onClose} />
          </header>
            <span className='border'></span>
          <div className="body">{children}</div>
        </div>
      </div>
    </Portal>
  );
};
