export default function PopupWithForm({
  title,
  name,
  buttonText,
  onSubmit,
  isOpen,
  onClose,
  children,
  isValid,
  isLoading,
}) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <form action="#" name={name} className="popup__form" onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          <ul className="popup__field-list">{children}</ul>
          <button
            type="submit"
            name="submitButton"
            className={'button button_type_submit  ' + (isValid ? '' : 'button_disabled')}
            disabled={!isValid}
          >
            {buttonText}
            <span className={'loader' + (isLoading ? ' loader_visible' : '')}></span>
          </button>
        </form>
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
