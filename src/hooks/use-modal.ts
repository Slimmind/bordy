import { useState, useCallback } from 'react';

type UseModalReturnType = [boolean, () => void, () => void];

export const useModal = (): UseModalReturnType => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return [isModalOpen, openModal, closeModal];
};

