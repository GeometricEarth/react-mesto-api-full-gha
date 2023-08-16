import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';
import usePopupClose from '../hooks/usePopupClose';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { handleInputChange, handleSubmit, formData, errors, isValid, resetForm } = useForm(
    {},
    onAddPlace
  );

  useEffect(() => {
    if (isOpen === true) {
      resetForm();
    }
  }, [isOpen]);

  usePopupClose(isOpen, onClose);

  return (
    <PopupWithForm
      name={'add-place'}
      title={'Новое место'}
      buttonText={'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
    >
      <li className="popup__field-list-element">
        <input
          type="text"
          className="popup__field"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          onChange={handleInputChange}
          value={formData.name ?? ''}
        />
        <p className={`popup__error ${errors.name ? 'popup__error_visible' : ''}`}>{errors.name}</p>
      </li>
      <li className="popup__field-list-element">
        <input
          type="url"
          className="popup__field"
          name="link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleInputChange}
          value={formData.link ?? ''}
        />
        <p className={`popup__error ${errors.link ? 'popup__error_visible' : ''}`}>{errors.link}</p>
      </li>
    </PopupWithForm>
  );
}
