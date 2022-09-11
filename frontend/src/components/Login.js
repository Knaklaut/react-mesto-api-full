import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ onLogin, loggedIn }) {
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
        if (!email || !password) {
            return;
        }
        onLogin(email, password);
    }

    return (
        <section className="opening">
            <div className="opening__container">
                <h2 className="opening__title">Вход</h2>
                <form className="opening__form" name="login-form" onSubmit={ handleSubmit } noValidate>
                    <input className="opening__input" name="login" type="email" placeholder="Email" value={email} onChange={ handleSetEmail } required />
                    <input className="opening__input" name="password" type="password" placeholder="Пароль" value={password} onChange={ handleSetPassword } required />
                    <button className="opening__submit-btn" type="submit">Войти</button>
                </form>
            </div>
        </section>
    );
}

export default Login;