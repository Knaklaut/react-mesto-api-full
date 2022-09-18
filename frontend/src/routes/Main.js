import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from '../components/Card';

function Main({ cards, onEditProfile, onEditAvatar, onAddCard, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return(
    <>
      <section className="profile">
        <figure className="user">
          <div className="user__avatar">
            <img className="user__avatar-pic" src={`${currentUser.avatar}`} alt="Аватар" />
            <button className="user__avatar-edit-button" onClick={onEditAvatar}></button>
          </div>
          <figcaption className="user__info">
            <div className="user__name">
              <h1 className="user__name-value">{currentUser.name}</h1>
              <button className="user__info-edit-button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="user__about">{currentUser.about}</p>
          </figcaption>
        </figure>
        <button className="profile__card-add-button" type="button" onClick={onAddCard}></button>
      </section>
      <section className="cards">
        <ul className="cards__set">
          {
            cards.map((card) => (
              <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
              )
            )}
        </ul>
      </section>
    </>
  );
}

export default Main;
