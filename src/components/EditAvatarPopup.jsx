import React from 'react';
import PopupWithForm from './PopupWithForm';


const EditAvatarPopup = (props) => {

    const [avatar, setAvatar] = React.useState('');
    const avatarRef = React.useRef('');
  
    const handleChange = (e) => {
      setAvatar(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      props.onUpdateAvatar(avatar);
    };
    return (
        <PopupWithForm
            title="Обновить аватар"
            name="edit-userAvatar"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__input-container" htmlFor="userAvatar">
                <input ref={avatarRef} onChange={handleChange} type="url" className="popup__input" id="userAvatar" placeholder="Ссылка на картинку" name="link" required />
                <span id="userAvatar-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;