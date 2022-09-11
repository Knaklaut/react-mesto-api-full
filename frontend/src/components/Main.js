import React, { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">

            <section className="profile">
                <div className="profile__avatar-section">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
                    <button className="profile__change-button" type="button" onClick={props.onEditAvatar} />
                </div>
                <div className="profile__info">
                    <div className="profile__edit">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile} />
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddCard} />
            </section>

            <section className="photobook">
                <ul className="photobook__elements">
                    {props.cards.map((card) => (
                        <Card key={card._id} card={card} onCardSelect={props.onCardSelect} onCardLike={props.onCardLike} onCardDelete={props.onDeleteCard} />)
                    )}
                </ul>
            </section>

        </main>
    );
}

export default Main;