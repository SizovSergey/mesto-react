import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { CurrentCardsContext } from '../context/CurrentCardsContext';

const Main = (props) => {

    const currentUser = React.useContext(CurrentUserContext);
    const currentCards = React.useContext(CurrentCardsContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" />
                    <button className="profile__avatar-change-button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__container">
                    <h1 className="profile__user-name">{currentUser.name}</h1>
                    <p className="profile__user-info">{currentUser.about}</p>
                    <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={props.onEditProfile} ></button>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={props.onAddNewPlace}></button>
            </section>
            <section className="elements">
                {currentCards && 
                currentCards.map((card) => {
                    return (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={props.onCardClick}
                            onRemovePlace={props.onRemovePlace}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    );
                })}
            </section>
        </main>
    );
}

export default Main;