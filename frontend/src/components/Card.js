import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(id => id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <li className="cards__item">
      <article className="card">
        {isOwn && <button className="card__remove-button" onClick={handleDeleteClick} />}
        <img className="card__photo" src={card.link} alt={card.name} onClick={handleClick} />
          <div className="card__info">
            <h2 className="card__name">{card.name}</h2>
            <button className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`} onClick={handleLikeClick}>
              <span className="card__like-counter">{card.likes.length}</span>
            </button>
          </div>
      </article>
    </li>
  );
}

export default Card;
