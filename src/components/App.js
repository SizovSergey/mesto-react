import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    "name":'',
    "about": '',
    "avatar": '',
    "_id": '',
    "cohort": ''
  });
  const [cards, setInitialCards] = React.useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddLocationPopup] = React.useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopup] = React.useState({ isOpen: false, card: {} });
  const [selectedCard, setSelectedCard] = React.useState(undefined);

  React.useEffect(() => {
    Promise.all([
      api.getUserinfo(),
      api.getInitialCards()
    ])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setInitialCards(cards);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [])

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  }

  const handleAddNewPlaceClick = () => {
    setAddLocationPopup(true);
  }


  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleConfirmDelete = (card) => {
    setDeletePlacePopup({ isOpen: true, card: card })
  }

  const closeAllPopups = () => {
    setEditProfilePopup(false);
    setEditAvatarPopup(false);
    setAddLocationPopup(false);
    setDeletePlacePopup({ isOpen: false, card: {} });
    setSelectedCard(undefined);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setInitialCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
    .catch(err => console.log(err.message)) 
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setInitialCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(err.message))
  };

  const handleUpdateUser = (updateUser) => {
    api.editProfile(updateUser.name, updateUser.about)
      .then((usetInfo) => {
        setCurrentUser(usetInfo)
        closeAllPopups();
      })
      .catch(err => console.log(err.message))
  }

  const handleUpdateAvatar = (link) => {
    api.editAvatar(link)
      .then((usetInfo) => {
        setCurrentUser(usetInfo)
        closeAllPopups();
      })
      .catch(err => console.log(err.message))
  }

  const handleAddPlaceSubmit = (place, link) => {
    api.insertNewCard(place, link)
      .then((newCard) => {
        setInitialCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err.message))
  }


  return (

    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddNewPlace={handleAddNewPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onConfirmDelete={handleConfirmDelete}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <DeletePlacePopup
          isOpen={isDeletePlacePopupOpen.isOpen}
          onClose={closeAllPopups}
          card={isDeletePlacePopupOpen.card}
          onCardDelete={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>

  );
}

export default App;
