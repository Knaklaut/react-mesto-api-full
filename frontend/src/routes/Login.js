import { useState } from "react";

function Login({ onLogin }) {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  function handleChange(evt) {
    const { name, value } = evt.target;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  }

  return (
    <form className="form form__authorization" noValidate onSubmit={handleSubmit}>
      <h2 className="form__title form__title_authorization">Вход</h2>
      <label className="form__item form__item_authorization">
        <input className="form__input form__input_authorization" name="email" type="email" value={email} placeholder="Email" minLength="2" maxLength="40" required onChange={handleChange} />
        <span className="form__input-error"></span>
      </label>
      <label className="form__item form__item_authorization">
        <input className="form__input form__input_authorization" name="password" type="password" value={password} placeholder="Пароль" minLength="2" maxLength="200" required onChange={handleChange} />
        <span className="form__input-error"></span>
      </label>
      <button className="button button__authorization form__submit form__submit_authorization">Войти</button>
    </form>
  );
}

export default Login;
