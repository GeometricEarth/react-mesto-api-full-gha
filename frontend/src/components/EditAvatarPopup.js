import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';
import usePopupClose from '../hooks/usePopupClose';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { handleInputChange, handleSubmit, formData, errors, isValid, resetForm } = useForm(
    {},
    onUpdateAvatar
  );

  useEffect(() => {
    if (isOpen === true) {
      resetForm();
    }
  }, [isOpen]);

  usePopupClose(isOpen, onClose);

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'avatar-editing'}
      buttonText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
    >
      <li className="popup__field-list-element">
        <input
          type="url"
          className="popup__field"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          onChange={handleInputChange}
          value={formData.avatar ?? ''}
        />
        <p className={'popup__error ' + (errors.avatar ? 'popup__error_visible' : '')}>
          {errors.avatar}
        </p>
      </li>
    </PopupWithForm>
  );
}
