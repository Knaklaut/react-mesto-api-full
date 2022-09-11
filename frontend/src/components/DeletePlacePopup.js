import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeletePlacePopup({ deleteCard: { isOpen, card }, onClose, onDeleteCard, isStoring }) {
    function handleSubmit(evt) {
        evt.preventDefault();
        onDeleteCard(card);
    }

    return (
        <PopupWithForm title="Вы уверены?" name='delete-photo' isOpen={ isOpen } onClose={ onClose } buttonName={ isStoring ? 'Удаление...' : 'Да' } onSubmit={ handleSubmit } />
    );
}

export default DeletePlacePopup;