import React from 'react';

const Card = (props) => {

    const handleCardClick = () => {
        props.onCardClick(props.card);
    }
    
    const handleRemoveCardClick = () => {
        props.onRemovePlace();
        
    }

    return (

        <div className="element">
            {console.log(props.onRemovePlace)}
            <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleCardClick} />
            <button className="element__button-remove" type="button" aria-label="Удалить карточку с картинкой" onClick={handleRemoveCardClick}></button>
            <div className="element__content">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like-container">
                    <button className="element__button-like" type="button" aria-label="Поставить лайк"></button>
                    <span className="element__like-count">{props.card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;