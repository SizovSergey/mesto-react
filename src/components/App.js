import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddLocationPopup] = React.useState(false);
  const [isRemovePlacePopupOpen, setRemoveLocationPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(undefined);

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  }

  const handleAddNewPlaceClick = () => { 
    setAddLocationPopup(true);
  }

  const handleRemovePlaceClick = () => { 
    setRemoveLocationPopup(true);
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



  return (
    
      <div className='page'>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddNewPlace={handleAddNewPlaceClick}
          onRemovePlace ={handleRemovePlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          title="Редактировать профиль"
          name="edit-profile"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить">
            <label className="popup__input-container" htmlFor="name">
              <input type="text" className="popup__input" id="name" placeholder="Имя" name="name" minLength="2" maxLength="40"
                required />
              <span id="name-error"></span>
            </label>
            <label className="popup__input-container" htmlFor="job">
              <input type="text" className="popup__input" id="job" placeholder="О себе" name="job" minLength="2" maxLength="200"
                required />
              <span id="job-error"></span>
            </label>
            </PopupWithForm>

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

        <PopupWithForm
          title="Обновить аватар"
          name="edit-userAvatar"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>      
            <label className="popup__input-container" htmlFor="userAvatar">
              <input type="url" className="popup__input" id="userAvatar" placeholder="Ссылка на картинку" name="link" required />
              <span id="userAvatar-error"></span>
            </label>      
            </PopupWithForm>

      <PopupWithForm
          title="Вы уверены?"
          name="type_delete-card"
          buttonText="Да"
          isOpen={isRemovePlacePopupOpen}
          onClose={closeAllPopups}
        /> 


        <ImagePopup 
        card = {selectedCard}
        onClose={closeAllPopups}
        />

      </div>
   
  );
}

export default App;
