import React from 'react';
import usePopupClose from '../hooks/usePopupClose';

export default function ImagePopup({ card, onClose }) {
  usePopupClose(card?.link, onClose);
  const isOpen = !!card && Object.keys(card).length !== 0 ? true : false;
  return (
    <div className={`popup popup_type_image-scaling ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <img src={card.link} alt={card.name} className="popup__enlarged-image" />
        <p className="popup__place-title">{card.name}</p>
        <button
          type="button"
          className="button button_type_close"
          aria-label="закрыть модальное окно"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
