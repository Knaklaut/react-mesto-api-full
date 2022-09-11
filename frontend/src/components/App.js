import '../index.css';
import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import * as auth from '../utils/auth.js';
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.js';
import Login from './Login.js';
import Header from './Header.js';
import InfoTooltip from './InfoTooltip.js';
import Main from './Main.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeletePlacePopup from './DeletePlacePopup.js';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState('');
  const history = useHistory();
  const [isInfoTooltip, setIsInfoTooltip] = useState({ isOpen: false, ok: false });
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [deletionConfirm, setDeletionConfirm] = useState({ isOpen: false, card: {} });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false, element: {} });
  const [dataStored, setDataStored] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
      auth.getUserToken(token)
        .then(() => {
          setLoggedIn(true);
          api.setToken(token);
        })
        .catch(err => console.log(err));
  }, []);
  
  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  function handleUserLogged() {
    setLoggedIn(true);
  }

  function handleInfoTooltip(outcome) {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: true, ok: outcome });
  }

  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardSelect(card) {
    setSelectedCard({ ...selectedCard, isOpen: true, element: card });
  }

  function handleDeletionConfirm(card) {
    setDeletionConfirm({ ...deletionConfirm, isOpen: true, card: card });
  }

  function closeAllPopups() {
    setIsInfoTooltip(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
    setDeletionConfirm({ ...deletionConfirm, isOpen: false });
  }

  function handleOverlayClickClose(evt) {
    if(evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    if(isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || deletionConfirm) {
      function handleEscClose(evt) {
        if(evt.key === 'Escape') {
          closeAllPopups();
        }
      }
      document.addEventListener('keydown', handleEscClose);
      return () => {
        document.removeEventListener('keydown', handleEscClose);
      }
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard, deletionConfirm]);

  function handleUserRegister(email, password) {
    auth.register(email, password)
    .then(data => {
      if (data) {
        handleInfoTooltip(true);
        history.push('/sign-in');
      }
    })
    .catch(err => {
      handleInfoTooltip(false);
      console.log(err);
    });
  }

  function handleUserLogin(email, password) {
    auth.login(email, password)
      .then(data => {
      if (data.token) {
        setEmail(email);
        handleUserLogged();
        localStorage.setItem('token', data.token);
        history.push('/');
      }
    })
    .catch(err => {
      handleInfoTooltip(true);
      console.log(err);
    });
  }

  function handleSignOut() {
    setLoggedIn(false);
    setEmail(null);
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  function handleUpdateUser(newUserData) {
    setDataStored(true);
    api.updateUserInfo(newUserData)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setDataStored(false);
      });
  }

  function handleUpdateAvatar(newAvatarLink) {
    setDataStored(true);
    api.changeAvatar(newAvatarLink)
      .then(data => {
        setCurrentUser({ ...currentUser, avatar: data.avatar });
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setDataStored(false);
      });
  }

  function handleAddNewCard(cardData) {
    setDataStored(true);
    api.postNewCard(cardData)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setDataStored(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    function handleNewCardLike (newCard) {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    }
    
    if (!isLiked) {
      api.addLike(card._id)
        .then(handleNewCardLike)
        .catch(err => {
          console.log(err);
        });
    } else {
      api.deleteLike(card._id)
        .then(handleNewCardLike)
        .catch(err => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    setDataStored(true);
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(c => c._id === card._id ? false : true);
        setCards(newCards);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setDataStored(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">

      <Header email={email} onSignOut={ handleSignOut } />

      <Switch>
        <ProtectedRoute exact path="/" 
          loggedIn={loggedIn} 
          component={Main} 
          onEditAvatar={ handleEditAvatarPopupOpen }
          onEditProfile={ handleEditProfilePopupOpen } 
          onAddCard={ handleAddPlacePopupOpen }
          cards={cards}
          onCardLike={ handleCardLike }
          onCardSelect={ handleCardSelect } 
          onDeleteCard={ handleDeletionConfirm }
        />

        <Route path="/sign-in">
          <Login loggedIn={loggedIn} onLogin={ handleUserLogin } />
        </Route>

        <Route path="/sign-up">
          <Register loggedIn={loggedIn} onRegister={ handleUserRegister } />
        </Route>
      </Switch>
      
      <Footer />

      <InfoTooltip outcome={isInfoTooltip} onClose={ closeAllPopups } onOverlayClose={ handleOverlayClickClose } />

      <ImagePopup card={selectedCard} onClose={ closeAllPopups } onOverlayClose={ handleOverlayClickClose } />

      <EditAvatarPopup 
        isOpen = {isEditAvatarPopupOpen}
        onClose = { closeAllPopups }
        onOverlayClose={ handleOverlayClickClose }
        onUpdateAvatar = { handleUpdateAvatar }
        isStoring = {dataStored}
      />

      <EditProfilePopup 
        isOpen = {isEditProfilePopupOpen}
        onClose = { closeAllPopups }
        onOverlayClose={ handleOverlayClickClose }
        onUpdateUser = { handleUpdateUser }
        isStoring = {dataStored}
      />

      <AddPlacePopup
        isOpen = {isAddPlacePopupOpen}
        onClose = { closeAllPopups }
        onOverlayClose={ handleOverlayClickClose }
        onAddCard = { handleAddNewCard }
        isStoring = {dataStored}
      />

      <DeletePlacePopup
        deleteCard={deletionConfirm}
        onClose={ closeAllPopups }
        onOverlayClose={ handleOverlayClickClose }
        onDeleteCard={ handleCardDelete }
        isStoring={ dataStored }
      />

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
