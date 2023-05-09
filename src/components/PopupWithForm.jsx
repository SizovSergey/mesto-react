import React from 'react';


const PopupWithForm = (props) =>{
  return(
    <div className={props.isOpen ? `popup popup_opened`: `popup`} id={`popup_${props.name}`}>
      <div className={props.name === 'edit-userAvatar' ? `popup__container popup__container_type-userAvatar`: `popup__container`}>
      <h3 class="popup__title">{props.title}</h3>
        <form className="popup__form" id={`popupForm_${props.name}`} name={props.name} novalidate>
          {props.children}  
        </form>
        <button className="popup__cancel-button" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;