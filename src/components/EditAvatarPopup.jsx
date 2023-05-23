import React from 'react';
import PopupWithForm from './PopupWithForm';


const EditAvatarPopup = (props) => {

    const avatarRef = React.useRef('');

    function handleChange(e) {
        avatarRef.current = e.target.value
    }

    const handleSubmit = (e) => {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateAvatar(
           avatarRef.current,
        );
    }

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="edit-userAvatar"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit ={handleSubmit}
        >
            <label className="popup__input-container" htmlFor="userAvatar">
                
                <input ref={avatarRef} onChange={handleChange}  type="url" className="popup__input" id="userAvatar" placeholder="Ссылка на картинку" name="link" required />
                <span id="userAvatar-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;