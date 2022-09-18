function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup__underlay ${card._id && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <figure className="popup__figure">
          <img className="popup__image" src={`${card.link}`} alt={`${card.name}.`} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
