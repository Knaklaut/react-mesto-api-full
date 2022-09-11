import React from 'react';
import access from '../images/icon-access.svg';
import reject from '../images/icon-reject.svg';

function InfoTooltip({ outcome: { isOpen, ok }, onClose, onOverlayClose }) {
    return (
        <section className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={ onOverlayClose }>
            <div className="popup__container popup__container_function_info">
                <button className="popup__close" type="button" onClick={ onClose } />
                <img className="popup__icon" src={ ok ? access : reject} alt="Сообщение о статусе регистрации на сайте" />
                <h2 className="popup__notification">{ok ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
            </div>
        </section>
    );
}

export default InfoTooltip;