import { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useForm from '../hooks/useForm';
import PopupWithForm from './PopupWithForm';
import usePopupClose from '../hooks/usePopupClose';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { handleInputChange, handleSubmit, formData, errors, isValid, resetForm } = useForm(
    currentUser ?? {},
    onUpdateUser
  );

  useEffect(() => {
    if (isOpen === true) {
      resetForm();
    }
  }, [isOpen]);

  usePopupClose(isOpen, onClose);

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'edit-profile'}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      isLoading={isLoading}
    >
      <li className="popup__field-list-element">
        <input
          type="text"
          className="popup__field"
          name="name"
          placeholder="Имя пользователя"
          required
          minLength="2"
          maxLength="40"
          onChange={handleInputChange}
          value={formData.name ?? ''}
        />
        <p className={'popup__error ' + (errors.name ? 'popup__error_visible' : '')}>
          {errors.name}
        </p>
      </li>
      <li className="popup__field-list-element">
        <input
          type="text"
          className="popup__field"
          name="about"
          placeholder="Род деятельности"
          required
          minLength="2"
          maxLength="200"
          onChange={handleInputChange}
          value={formData.about ?? ''}
        />
        <p className={'popup__error ' + (errors.about ? 'popup__error_visible' : '')}>
          {errors.about}
        </p>
      </li>
    </PopupWithForm>
  );
}
