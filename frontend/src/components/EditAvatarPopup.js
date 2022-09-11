import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isStoring }) {
    const ref = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: ref.current.value
        });
    }

    useEffect(() => {
        ref.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm title="Обновить аватар" name="change-avatar" isOpen={ isOpen } onClose={ onClose } buttonName={ isStoring ? 'Сохранение...' : 'Сохранить' } onSubmit={ handleSubmit }>
            <input className="popup__input popup__input_change-avatar_link" ref={ ref } name="link" id="change-avatar-input" type="url" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error" id="change-avatar-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;