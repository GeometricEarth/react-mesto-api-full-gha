import { Link, useLocation } from 'react-router-dom';
import logo from '../images/header__logo.svg';

export default function Header({ userEmail, isLoggedIn, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="Логотип 'Место Россия'" className="header__logo" />
      <div className="navbar">
        {isLoggedIn && <p className="navbar__userInfo">{userEmail}</p>}
        <ul className="navbar__list">
          {location.pathname === '/sign-up' && (
            <li>
              <Link className="navbar__link" to="/sign-in">
                Войти
              </Link>
            </li>
          )}
          {location.pathname === '/sign-in' && (
            <li>
              <Link className="navbar__link" to="sign-up">
                Регистрация
              </Link>
            </li>
          )}
          <li>
            {isLoggedIn && (
              <button className="navbar__button" onClick={onSignOut}>
                Выйти
              </button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
