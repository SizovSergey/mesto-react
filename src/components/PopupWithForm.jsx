import React from 'react';


const PopupWithForm = (props) => {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`} id={`popup_${props.name}`}>
      <div className={`popup__container ${props.name === 'edit-userAvatar' ? 'popup__container_type-userAvatar' : ''} 
       ${props.name === 'type_delete-card' ? 'popup__container_type-delete' : ''}`}>
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" id={`popupForm_${props.name}`} name={props.name} noValidate>
          {props.children}
        </form>
        <button className="popup__cancel-button" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;


