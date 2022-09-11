function PopupWithForm({ name, title, buttonName, children, isOpen, onClose, onSubmit }) {
    return (
        <section className={`popup popup_function_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup__container_function_${name}`}>
                <button className="popup__close" type="button" onClick={ onClose } />
                <h2 className={`popup__title popup__title_function_${name}`}>{title}</h2>
                <form className="popup__form" name={`popup-form-${name}`} onSubmit={ onSubmit } noValidate>
                    <fieldset className="popup__input-area">
                        {children}
                        <button className={`popup__submit-btn popup__submit-btn_function_${name}`} type="submit">{buttonName}</button>
                    </fieldset>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;