import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { CurrentCardsContext } from '../context/CurrentCardsContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState('');
  const [cards, setInitialCards] = React.useState('');
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddLocationPopup] = React.useState(false);
  const [isRemovePlacePopupOpen, setRemoveLocationPopup] = React.useState(false);
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
    setRemoveLocationPopup(false);
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
  api.editProfile(updateUser.name,updateUser.about)
  .then((usetInfo) =>{
    setCurrentUser(usetInfo)
    closeAllPopups();
  })
}

const handleUpdateAvatar = (link) => {
  api.editAvatar(link)
  .then((usetInfo) =>{
    setCurrentUser(usetInfo)
    closeAllPopups();
  })
}

  return (

    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardsContext.Provider value={cards}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddNewPlace={handleAddNewPlaceClick}
          onCardClick={handleCardClick}
          onCardLike ={handleCardLike}
          onCardDelete ={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
         />

        <PopupWithForm
          title="Новое место"
          name="add-elements"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText="Создать">
          <label className="popup__input-container" htmlFor="place">
            <input type="text" className="popup__input" id="place" placeholder="Новое место" name="place" minLength="1"
              maxLength="30" required />
            <span id="place-error"></span>
          </label>
          <label className="popup__input-container" htmlFor="link">
            <input type="url" className="popup__input" id="link" placeholder="Ссылка на картинку" name="link" required />
            <span id="link-error"></span>
          </label>
        </PopupWithForm>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <PopupWithForm
          title="Вы уверены?"
          name="type_delete-card"
          buttonText="Да"
          isOpen={isRemovePlacePopupOpen}
          onClose={closeAllPopups}
        />


        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
         </CurrentCardsContext.Provider>
      </CurrentUserContext.Provider>
    </div>

  );
}

export default App;
