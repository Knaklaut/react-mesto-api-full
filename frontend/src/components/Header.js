import React, {useState} from 'react';
import { Route, Link } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header({ email, onSignOut }) {
    const [isSelected, setIsSelected] = useState(false);

    function handleClickHeaderButton() {
        setIsSelected(!isSelected);
    }

    return (
        <header className="header">
            <div className={`header__container ${isSelected ? 'header__container_menu' : ''}`}>
            <img className={`header__logo ${isSelected? 'header__logo_menu' : ''}`} alt="Логотип Mesto" src={logo} />
            <Route path="/sign-in">
                <Link to="sign-up" className="header__link">Регистрация</Link>
            </Route>
            <Route path="/sign-up">
                <Link to="sign-in" className="header__link">Войти</Link>
            </Route>
            <Route exact path="/">
                <div className={`header__button ${isSelected ? 'header__button_close' : ''}`} onClick={ handleClickHeaderButton }>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <nav className={`header__reg-data ${isSelected ? 'header__reg-data_menu' : ''}`}>
                    <p className="header__email">{email}</p>
                    <button className="header__link header__sign-out" onClick={() => {handleClickHeaderButton(); onSignOut();}}>Выйти</button>
                </nav>
            </Route>
            </div>
        </header>
    );
}

export default Header;