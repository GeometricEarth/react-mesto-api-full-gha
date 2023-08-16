import { useEffect } from 'react';

export default function usePopupClose(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    const handleOverlayClick = (event) => {
      if (event.target.classList.contains('popup_opened')) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOverlayClick);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOverlayClick);
    };
  }, [isOpen, onClose]);
}
