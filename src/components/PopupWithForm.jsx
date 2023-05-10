import React from 'react';


const PopupWithForm = ({isOpen, onClose, name, title, buttonText, children}) => {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} id={`popup_${name}`}>
      <div className={`popup__container ${name === 'edit-userAvatar' ? 'popup__container_type-userAvatar' : ''} 
       ${name === 'type_delete-card' ? 'popup__container_type-delete' : ''}`}>
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" id={`popupForm_${name}`} name={name}>
          {children}
          <button className = {`popup__submit-button ${name === 'type_delete-card' ? 'popup__submit-button_type-deletePopup' : ''}`} type="submit" >{buttonText}</button>
        </form>
        <button className="popup__cancel-button" type="button" onClick={onClose}/>
      </div>
    </div>
  );
}

export default PopupWithForm;


