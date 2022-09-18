import { useState, useEffect } from 'react';
import { Route, useHistory, Link, Redirect, Switch } from 'react-router-dom';
import api from '../utils/api';
import auth from '../utils/auth';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import PageNotFound from './PageNotFound';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AuthContext } from '../contexts/AuthContext';

function App() {
  const history = useHistory();
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ isSuccessful, setIsSuccessful ] = useState(false);
  const [ isInfoTooltipPopupOpen, setInfoTooltipPopupOpen ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState({});
  const [ userEmail, setUserEmail ] = useState('auth@yandex.ru');
  const [ isEditAvatarPopupOpen, setEditAvatarPopupOpen ] = useState(false);
  const [ isEditProfilePopupOpen, setEditProfilePopupOpen ] = useState(false);
  const [ isAddCardPopupOpen, setAddCardPopupOpen ] = useState(false);
  const [ cards, setCards ] = useState([]);
  const [ selectedCard, setSelectedCard ] = useState({});

  useEffect(() => {
    checkToken();
  });

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getProfile(localStorage.getItem("jwt")),
        api.getInitialCards(localStorage.getItem("jwt"))
      ])
        .then(([data, cards]) => {
          setCurrentUser(data);
          setCards(cards);
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (isInfoTooltipPopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddCardPopupOpen || selectedCard) {
      function handleEscClose(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }
      document.addEventListener('keydown', handleEscClose);
      return() => {
        document.removeEventListener('keydown', handleEscClose);
      }
    }
  });

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleAddCardClick() {
    setAddCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function sendLoginInfo(email, password) {
    auth.authorize(email, password)
      .then(res => {
        if (res.token) {
          setLoggedIn(true);
          setUserEmail(email);
          history.push('/');
        }
      })
      .catch(() => {
        setIsSuccessful(false);
        setInfoTooltipPopupOpen(true);
      });
  }

  function sendRegisterInfo(email, password) {
    auth.register(email, password)
      .then(res => {
        if (res.statusCode !== '400') {
          setIsSuccessful(true);
          setInfoTooltipPopupOpen(true);
          setTimeout(() => {
            setInfoTooltipPopupOpen(false);
            sendLoginInfo(email, password);
          }, 2000);
        }
      })
      .catch(() => {
        setIsSuccessful(false);
        setInfoTooltipPopupOpen(true);
      });
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then(data => {
          if (data.email) {
            setUserEmail(data.email);
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch(err => console.log(err));
    }
  }

  function handleExitClick() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/signin');
  }

  function handleUpdateAvatar({avatar}) {
    api.editAvatar(avatar, localStorage.getItem("jwt"))
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.og(err));
  }

  function handleUpdateUser({ name, about }) {
    api.editProfile(name, about, localStorage.getItem("jwt"))
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddCard({ name, link }) {
    api.addCard(name, link, localStorage.getItem("jwt"))
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleLikeCard(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    (isLiked ? api.deleteLike(card._id, localStorage.getItem("jwt")) : api.addLike(card._id, localStorage.getItem("jwt")))
      .then(data => {
        setCards((set) => set.map(currentCard => currentCard._id === card._id ? data : currentCard));
      })
      .catch(err => console.log(err));
  }

  function handleDeleteCard(card) {
    api.deleteCard(card, localStorage.getItem("jwt"))
      .then(() => {
        setCards(set => set.filter(currentCard => currentCard._id !== card));
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleOverlayClickClose(evt) {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setInfoTooltipPopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddCardPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AuthContext.Provider value={{ loggedIn: loggedIn, userEmail: userEmail }}>
        <div className="page">

          <Header onSignOut={handleExitClick} />
          <main className="container">
            <Link to="/signup"></Link>
            <Switch>
              <ProtectedRoute exact path="/" component={Main} loggedIn={loggedIn} cards={cards} onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddCard={handleAddCardClick} onCardClick={handleCardClick} onCardLike={handleLikeCard} onCardDelete={handleDeleteCard}  />
              <Route path="/signup">
                <Register onRegister={sendRegisterInfo} />
              </Route>
              <Route path="/signin">
                <Login onLogin={sendLoginInfo} />
              </Route>
              <Route>
                <Redirect to={`${loggedIn ? '/' : '/signin'}`} />
              </Route>
              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>
          </main>
          <Footer />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            isSuccessful={isSuccessful}
            onOverlayClose = {handleOverlayClickClose}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onOverlayClose = {handleOverlayClickClose}
            onClose={closeAllPopups}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onOverlayClose = {handleOverlayClickClose}
            onClose={closeAllPopups}
          />

          <AddPlacePopup
            isOpen={isAddCardPopupOpen}
            onAddCard={handleAddCard}
            onOverlayClose = {handleOverlayClickClose}
            onClose={closeAllPopups}
          />

          <ImagePopup
            card={selectedCard}
            onOverlayClose = {handleOverlayClickClose}
            onClose={closeAllPopups}
          />

        </div>
      </AuthContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
