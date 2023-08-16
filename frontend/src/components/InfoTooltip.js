import successIcon from '../images/success_icon.svg';
import failIcon from '../images/fail_icon.svg';
import usePopupClose from '../hooks/usePopupClose';

export default function InfoTooltip({ onClose, isSuccessful }) {
  usePopupClose(isSuccessful !== null, onClose);

  return (
    <div className={`popup ${isSuccessful !== null && 'popup_opened'}`}>
      <div className="popup__container">
        <div className="popup__infoTooltip">
          <img src={isSuccessful ? successIcon : failIcon} className="popup__status-image"></img>
          <h2 className="popup__title">
            {isSuccessful
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h2>
        </div>
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
