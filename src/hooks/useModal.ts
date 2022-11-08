import { useState } from "react";


export const useModal = () => {
  const [modalId, setModalId] = useState<string>('');
  const openModal = (id: string) => {
    setModalId(id);
  };

  const closeModal = (id: string) => {
    if (modalId === id) {
      setModalId('');
    }
  };

  return {
    modalId,
    openModal,
    closeModal,
  };
};
