function InfoTooltip({ isOpen, onClose, onOverlayClose, isSuccessful }) {
  const icon = isSuccessful ? 'popup__status_access_granted' : 'popup__status_access_denied';
  const notice = isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'
  return (
    <section className={`popup popup__underlay ${isOpen ? 'popup_opened' : ''}`} onClick={onOverlayClose}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <div className="popup__content popup__content_type_infotooltip">
          <div className={`popup__status ${icon}`} />
          <p className="popup__notice popup__notice_type_infotooltip">{notice}</p>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
