import React from 'react';

const Card = (props) => {
    
    const handleCardClick = () =>  {
        props.onCardClick(props.card);
        
      }  

    return (
        
        <div class="element">
      <img src={props.card.link} alt={props.card.name} class="element__image" onClick={handleCardClick}/>
      <button class="element__button-remove" type="button" aria-label="Удалить карточку с картинкой"></button>
      <div class="element__content">
        <h2 class="element__title">{props.card.name}</h2>
        <div class="element__like-container">
        <button class="element__button-like" type="button" aria-label="Поставить лайк"></button>
        <span class="element__like-count">{props.card.likes.length}</span>
      </div>
      </div>
    </div>
    );
}

export default Card;