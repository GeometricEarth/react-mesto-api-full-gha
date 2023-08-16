import { Link } from 'react-router-dom';
import { register } from '../utils/auth';
import IdentificationForm from './IdentificationForm';

export default function Register({ setTooltipStatus }) {
  async function handleRegister(formData) {
    try {
      const res = await register(formData);
      setTooltipStatus(true);
    } catch (error) {
      setTooltipStatus(false);
      console.error(error);
    }
  }

  return (
    <div className="identification">
      <IdentificationForm
        onSubmit={handleRegister}
        title="Регистрация"
        buttonText="Зарегистрироваться"
      ></IdentificationForm>
      <p className="identification__navigate">
        Уже зарегистрированы?{' '}
        <Link className="identification__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </div>
  );
}
