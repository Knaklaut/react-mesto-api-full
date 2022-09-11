import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddCard, isStoring }) {
    const [name, addName] = useState('');
    const [link, addLink] = useState('');

    function handleAddName(evt) {
        addName(evt.target.value);
    }

    function handleAddLink(evt) {
        addLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddCard({ name, link });
    }

    React.useEffect(() => {
        addName('');
        addLink('');
    }, [isOpen]);

    return (
        <PopupWithForm title="Новое место" buttonName={ isStoring ? 'Сохранение...' : 'Создать' } isOpen={ isOpen } onClose={ onClose } onSubmit={ handleSubmit }>
            <input className="popup__input popup__input_add-card_name" value={name} onChange={ handleAddName } id="card-name-input" type="text" placeholder="Введите ваше имя" name="name" minLength="2" maxLength="40" required />
            <span className="popup__input-error" id="card-name-input-error"></span>
            <input className="popup__input popup__input_add-card_link" value={link} onChange={ handleAddLink } id="card-link-input" type="url" placeholder="Ссылка на картинку" name="link" required />
            <span className="popup__input-error" id="card-link-input-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;