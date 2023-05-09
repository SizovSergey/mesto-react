import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddLocationPopup] = React.useState(false);
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

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setEditProfilePopup(false);
    setEditAvatarPopup(false);
    setAddLocationPopup(false);
    setSelectedCard(undefined);
  }



  return (
    <>
      <div className='page'>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddNewPlace={handleAddNewPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          title="Редактировать профиль"
          name="edit-profile"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          children={<>
            <label className="popup__input-container" for="name">
              <input type="text" className="popup__input" id="name" placeholder="Имя" name="name" minlength="2" maxlength="40"
                required />
              <span id="name-error"></span>
            </label>
            <label className="popup__input-container" for="job">
              <input type="text" className="popup__input" id="job" placeholder="О себе" name="job" minlength="2" maxlength="200"
                required />
              <span id="job-error"></span>
            </label>
            <button className="popup__submit-button" type="submit">Сохранить</button>
          </>
          } />

        <PopupWithForm
          title="Новое место"
          name="add-elements"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          children={<>
            <label className="popup__input-container" for="place">
              <input type="text" className="popup__input" id="place" placeholder="Новое место" name="place" minlength="1"
                maxlength="30" required />
              <span id="place-error"></span>
            </label>
            <label className="popup__input-container" for="link">
              <input type="url" className="popup__input" id="link" placeholder="Ссылка на картинку" name="link" required />
              <span id="link-error"></span>
            </label>
            <button className="popup__submit-button" type="submit">Создать</button>
          </>
          } />

        <PopupWithForm
          title="Обновить аватар"
          name="edit-userAvatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          children={<>

            <label clasclassNames="popup__input-container" for="userAvatar">
              <input type="url" class="popup__input" id="userAvatar" placeholder="Ссылка на картинку" name="link" required />
              <span id="userAvatar-error"></span>
            </label>
            <button className="popup__submit-button" type="submit">Сохранить</button>
          </>
          } />

        {/* <PopupWithForm
          title="Вы уверены?"
          name="type_delete-card"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          children={<>
           <button class="popup__submit-button popup__submit-button_type-deletePopup" type="submit">Да</button>
          </>
          } /> */}
        <PopupWithImage 
        card = {selectedCard}
        onClose={closeAllPopups}
        />

      </div>
    </>
  );
}

export default App;
