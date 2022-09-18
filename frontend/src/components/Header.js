import { useState, useContext } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import logo from "../images/logo.svg";

function Header({ onSignOut }) {
  const [ isMenuActive, setMenuActive ] = useState(false);
  const { loggedIn, userEmail } = useContext(AuthContext);

  const headerMenu = (
    <div className={`menu ${isMenuActive ? 'menu_visible' : ''}`}>
      <p className="menu__user-email">{userEmail}</p>
      <button className="menu__exit" onClick={handleExitClick}>Выйти</button>
    </div>
  );

  function openMenu() {
    setMenuActive(!isMenuActive);
  }

  function handleExitClick() {
    setMenuActive(false);
    onSignOut();
  }

  const headerLink = (
    <Switch>
      <Route path="/signin">
        <Link to="/signup" className="link header__link">Регистрация</Link>
      </Route>
      <Route path="/signup">
        <Link to="/signin" className="link header__link">Войти</Link>
      </Route>
    </Switch>
  );

  return (
    <header className="header">
      { loggedIn && headerMenu }
      <div className="header__container">
        <Link className="header__logo" to="/">
          <img className="header__logo-image" src={logo} alt="Логотип Mesto" />
        </Link>
        { !loggedIn && headerLink }
        { loggedIn && <button className={`header__menu-button ${isMenuActive ? 'header__menu-button_close' : ''}`} onClick={openMenu} /> }
      </div>
    </header>
  );
}

export default Header;
