import '../index.css';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import api from '../utils/api';

import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoToolTip from './InfoToolTip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';



function App() {
  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: '', id: ''});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isToolTipInfo, setIsToolTipInfo] = useState({isOpen: false, imgPath: '', text: ''});
  const [selectedCard, setSelectedCard] = useState({isOpen: false, link: '', place: ''});

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  function handleLogin() {
    setLoggedIn(!loggedIn);
  };

  const [cards, setCards] = useState([]);
  useEffect(() => {
    api.getInfoAboutMe()
      .then((aboutMeData) => {
        setCurrentUser({name: aboutMeData.name, about: aboutMeData.about, avatar: aboutMeData.avatar, id: aboutMeData._id})
      })
      .catch(err => console.log(err));
    api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch(err => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser.id);
    api.toggleLike(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch(err => console.log(err));
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id))
      })
      .catch(err => console.log(err));
  };
  function handleUpdateUser(name, description) {
    api.updateProfileInfo(name, description)
      .then((data) => {
        setCurrentUser({...currentUser, name: data.name, about: data.about});
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };
  function handleUpdateAvatar({avatar}) {
    api.updateAvatar(avatar)
      .then((data) => {
        setCurrentUser({...currentUser, avatar: data.avatar});
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };
  function handleAddPlaceSubmit(place, url) {
    api.addCard(place, url)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };
  function handleCardClick(url, name) {
    setSelectedCard({isOpen: true, link: url, place: name});
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsToolTipInfo({...isToolTipInfo, isOpen: false});
    setSelectedCard({isOpen: false, link: '', place: ''});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Routes>
          <Route path="/" element={<ProtectedRoute userEmail={userEmail} element={Main} handleLogin={handleLogin} loggedIn={loggedIn} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onEditProfile={handleEditProfileClick} />} />
          <Route path="/sign-in" element={<><Header pathName="../sign-up">Регистрация</Header><Login setUserEmail={setUserEmail} setIsToolTipInfo={setIsToolTipInfo} handleLogin={handleLogin}/></>}/>
          <Route path="/sign-up" element={<><Header pathName="../sign-in">Войти</Header><Register setIsToolTipInfo={setIsToolTipInfo} /></>}/>
        </Routes>
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddCard={handleAddPlaceSubmit} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}/>
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <PopupWithForm buttonText='Да' title="Вы уверены?" name="delete">
        </PopupWithForm>
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <InfoToolTip isToolTipInfo={isToolTipInfo} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
};

export default App;
