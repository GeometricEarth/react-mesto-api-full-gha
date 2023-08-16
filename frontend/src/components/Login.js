import { useNavigate } from 'react-router-dom';
import { authorize } from '../utils/auth';
import IdentificationForm from './IdentificationForm';

export default function Login({ handleSetLoggedIn, handleSetEmail, setTooltipStatus }) {
  const navigate = useNavigate();
  async function handleLogin(formData) {
    try {
      await authorize(formData);
      handleSetEmail(formData.email);
      handleSetLoggedIn(true);
      navigate('/');
    } catch (error) {
      setTooltipStatus(false);
      console.error(error);
    }
  }

  return (
    <div className="identification">
      <IdentificationForm
        onSubmit={handleLogin}
        title="Вход"
        buttonText="Войти"
        isLoading={false}
      ></IdentificationForm>
    </div>
  );
}
