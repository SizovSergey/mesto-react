import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState('');
  const [cards, setInitialCards] = React.useState('');
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddLocationPopup] = React.useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopup] = React.useState(false);
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

  const closeAllPopups = () => {
    setEditProfilePopup(false);
    setEditAvatarPopup(false);
    setAddLocationPopup(false);
    setDeletePlacePopup(false);
    setSelectedCard(undefined);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setInitialCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setInitialCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleUpdateUser = (updateUser) => {
    api.editProfile(updateUser.name, updateUser.about)
      .then((usetInfo) => {
        setCurrentUser(usetInfo)
        closeAllPopups();
      })
  }

  const handleUpdateAvatar = (link) => {
    api.editAvatar(link)
      .then((usetInfo) => {
        setCurrentUser(usetInfo)
        closeAllPopups();
      })
  }

  const handleAddPlaceSubmit = (place,link) => {
    api.insertNewCard(place,link)
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
          onCardDelete={handleCardDelete}
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
          title="Вы уверены?"
          name="type_delete-card"
          buttonText="Да"
          isOpen={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
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
