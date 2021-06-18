import React, { useCallback, useEffect, useRef } from 'react';
import { StyledModal } from './styles';

interface props {
  children: JSX.Element | JSX.Element[];
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, openModal, setOpenModal }: props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    ({ target }) => {
      if (openModal && !modalRef.current?.contains(target)) setOpenModal(false);
    },
    [setOpenModal, openModal]
  );

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [handleClickOutside]);

  return (
    <StyledModal>
      <div ref={modalRef}>{children}</div>
    </StyledModal>
  );
};

export default Modal;
