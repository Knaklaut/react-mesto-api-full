function PopupWithForm({ isOpen, onClose, onSubmit, name, title, children }) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <form className="form popup__content popup__content_type_form" name={`${name}-form`} onSubmit={onSubmit}>
          <h2 className="form__title">{title}</h2>
          {children}
          <button className="button form__submit">Сохранить</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
