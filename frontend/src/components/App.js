import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Api from '../utils/API';
import { getUserData } from '../utils/auth';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState(null);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cardsList, setCardsList] = useState([]);
  const [cardToBeDeleted, setCardToBeDeleted] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getUserData()
      .then((res) => {
        setLoggedIn(true);
        setEmail(res.data.email);
        navigate('/');
      })
      .catch((err) => {
        setLoggedIn(false);
        console.error(err);
      });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      Api.getCards()
        .then((cards) => {
          setCardsList(cards);
        })
        .catch((err) => {
          console.error(err);
        });

      Api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteClick(cardId) {
    setCardToBeDeleted(cardId);
  }

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    Api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCardsList((state) =>
          state.map((cardInState) => (cardInState._id === card._id ? newCard : cardInState))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    const request = () => {
      return Api.deleteCard(cardToBeDeleted).then(() => {
        setCardsList((state) => {
          return state.filter((card) => card._id !== cardToBeDeleted);
        });
      });
    };
    handleSubmit(request);
  }

  function handleUpdateUser(userData) {
    if (userData.name === currentUser.name && userData.about === currentUser.about) {
      closeAllPopups();
      return;
    }
    const request = () => {
      return Api.setUserInfo(userData).then((res) => {
        setCurrentUser(res);
      });
    };
    handleSubmit(request);
  }

  function handleUpdateAvatar(link) {
    if (link && link === currentUser.avatar) {
      closeAllPopups();
      return;
    }
    const request = () => {
      return Api.updateUserAvatar(link).then((res) => {
        setCurrentUser(res);
      });
    };
    handleSubmit(request);
  }

  function handleAddPlace(newPlace) {
    const request = () => {
      return Api.addCard(newPlace).then((res) => {
        setCardsList([res, ...cardsList]);
      });
    };
    handleSubmit(request);
  }

  const handleCloseTooltip = () => {
    if (tooltipStatus === true) {
      navigate('/sign-in');
    }
    setTooltipStatus(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in');
  };

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
    setCardToBeDeleted('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={email} isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  cardsList={cardsList}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDeleteClick}
                />
              }
            ></Route>
            <Route
              path="/sign-in"
              element={
                <Login
                  handleSetLoggedIn={setLoggedIn}
                  handleSetEmail={setEmail}
                  setTooltipStatus={setTooltipStatus}
                />
              }
            ></Route>
            <Route path="/sign-up" element={<Register setTooltipStatus={setTooltipStatus} />} />
          </Routes>

          <Footer />
        </div>

        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          title={'Обновить аватар'}
          name={'avatar-editing'}
          buttonText={'Сохранить'}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <PopupWithForm
          title={'Вы уверены?'}
          name={'confirm'}
          buttonText={'Да'}
          isOpen={cardToBeDeleted}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          isValid={true}
          isLoading={isLoading}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip onClose={handleCloseTooltip} isSuccessful={tooltipStatus}></InfoTooltip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
