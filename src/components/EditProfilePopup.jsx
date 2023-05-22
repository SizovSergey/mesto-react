import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { api } from '../utils/Api';

const EditProfilePopup = (props) => {

    const currentUser = React.useContext(CurrentUserContext);
    const [name,setName] = React.useState('');
    const [description,setDescription] = React.useState('');

    React.useEffect(() => {
    api.editProfile(name,description)
       .then(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    })
    .catch((err) => console.log(err.message))
      }, [currentUser]); 

    
    function handleChangeName(e) {
        setName(e.target.value);
      }

      function handleChangeDescription(e) {
        setDescription(e.target.value);
      }


    return(
     
        <PopupWithForm
        title="Редактировать профиль"
        name="edit-profile"
        isOpen={props.isOpen}
        onClose={props.onClose}
        buttonText="Сохранить">
        <label className="popup__input-container" htmlFor="name">
          <input value={name} onChange={handleChangeName} type="text" className="popup__input" id="name" placeholder="Имя" name="name" minLength="2" maxLength="40"
            required />
          <span id="name-error"></span>
        </label>
        <label className="popup__input-container" htmlFor="job">
          <input value={description} onChange={handleChangeDescription} type="text" className="popup__input" id="job" placeholder="О себе" name="job" minLength="2" maxLength="200"
            required />
            {console.log(description)}
          <span id="job-error"></span>
        </label>
      </PopupWithForm>
 
    );
}

export default EditProfilePopup;