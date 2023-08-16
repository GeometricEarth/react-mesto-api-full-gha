import useForm from '../hooks/useForm';

export default function IdentificationForm({ onSubmit, title, buttonText, isLoading }) {
  const { handleInputChange, handleSubmit, formData, errors } = useForm({}, onSubmit);

  return (
    <div className="login">
      <form action="#" className="form" onSubmit={handleSubmit}>
        <h2 className="from__title">{title}</h2>
        <ul className="form__input-list form__input-list_type_identification">
          <li className="form__input-list-element">
            <input
              type="email"
              className="form__input"
              name="email"
              placeholder="Email"
              required
              onChange={handleInputChange}
              value={formData.email ?? ''}
            />
            <p className={'popup__error ' + (errors.email ? 'popup__error_visible' : '')}>
              {errors.email}
            </p>
          </li>
          <li className="form__input-list-element">
            <input
              type="password"
              className="form__input"
              name="password"
              placeholder="Пароль"
              required
              onChange={handleInputChange}
              value={formData.password ?? ''}
            />
            <p className={'popup__error ' + (errors.password ? 'popup__error_visible' : '')}>
              {errors.password}
            </p>
          </li>
        </ul>
        <button
          type="submit"
          name="submitButton"
          className={'button button_type_submit button_theme_white'}
        >
          {buttonText}
          <span className={'loader' + (isLoading ? ' loader_visible' : '')}></span>
        </button>
      </form>
    </div>
  );
}
