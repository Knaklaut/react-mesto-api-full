import React from 'react';

function ImagePopup({ card: { isOpen, element: { name, link } }, onClose }) {
    return (
        <section className={`popup popup_function_open-photo ${ isOpen ? "popup_opened" : '' }`}>
            <div className="popup__elements">
                <button className="popup__close" type="button" onClick={ onClose } />
                <img className="popup__photo" src={link} alt={name} />
                <h2 className="popup__photo-title">{name}</h2>
            </div>
        </section>
    )
}

export default ImagePopup;