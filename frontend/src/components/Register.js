import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Register({ onRegister, loggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useEffect(() => {
        if(loggedIn) {
            history.push('/');
        }
    }, [loggedIn, history]);

    function handleSetEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleSetPassword(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister(email, password);
    }

    return (
        <section className="opening">
            <div className="opening__container">
                <h2 className="opening__title">Регистрация</h2>
                <form className="opening__form" name="register-form" onSubmit={ handleSubmit } noValidate>
                    <input className="opening__input" name="login" type="email" placeholder="Email" value={email} onChange={ handleSetEmail } required />
                    <input className="opening__input" name="password" type="password" placeholder="Пароль" value={password} onChange={ handleSetPassword } required />
                    <button className="opening__submit-btn" type="submit">Зарегистрироваться</button>
                    <p className="opening__caption">Уже зарегистрированы? <Link to='sign-in' className="opening__link">Войти</Link></p>
                </form>
            </div>
        </section>
    );
}

export default Register;