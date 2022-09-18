import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [ name, setName ] = useState('');
  const [ userInfo, setUserInfo ] = useState('');

  function handleChange(evt) {
    const el = evt.target;
    if (el.name === 'user-name') {
      setName(el.value);
    }
    if (el.name === 'user-about') {
      setUserInfo(el.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: userInfo,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setUserInfo(currentUser.about);
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm title="Редактировать профиль" name="user-info-edit" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <label className="form__item">
        <input className="form__input" name="user-name" value={name || ''} type="text" placeholder="Имя" minLength="2" maxLength="40" required onChange={handleChange} />
        <span className="form__input-error" id="error-user-name"></span>
      </label>
      <label className="form__item">
        <input className="form__input" name="user-about" value={userInfo || ''} type="text" placeholder="О себе" minLength="2" maxLength="200" required onChange={handleChange} />
        <span className="form__input-error" id="error-user-about"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
