import React, { useCallback, useRef } from 'react';
import { useEffect } from 'react';
import { StyledModal } from './styles';

interface props {
  children: JSX.Element | JSX.Element[];
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, openModal, setOpenModal }: props) => {
  const modalEl = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    ({ target }) => {
      if (openModal && !modalEl.current?.contains(target)) setOpenModal(false);
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
    <StyledModal openModal={openModal}>
      <div ref={modalEl}>{children}</div>
    </StyledModal>
  );
};

export default Modal;
