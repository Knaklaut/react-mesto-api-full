import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isStoring }) {
    const currentUser = useContext(CurrentUserContext);
    const [ name, setName ] = useState('');
    const [ about, setAbout ] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSetName(evt) {
        setName(evt.target.value);
    }

    function handleSetAbout(evt) {
        setAbout(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: about
        });
    }

    return (
        <PopupWithForm title="Редактировать профиль" name="user-info" isOpen={ isOpen } onClose={ onClose } buttonName={ isStoring ? 'Сохранение...' : 'Сохранить' } onSubmit={ handleSubmit }>
            <input className="popup__input popup__input_el_name" name="userName" value={ name || '' } id="name-input" type="text" onChange={ handleSetName } placeholder="Введите ваше имя" minLength="2" maxLength="40" required />
            <span className="popup__input-error" id="name-input-error"></span>
            <input className="popup__input popup__input_el_about" name="userAbout" value={ about || '' } id="about-input" type="text" onChange={ handleSetAbout } placeholder="Введите вашу профессию" minLength="2" maxLength="200" required />
            <span className="popup__input-error" id="about-input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;