import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';

const Main = (props) => {
    const [userName, setUserName] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('link');
    const [userDescription, setUserDescription] = React.useState('');
    const [cards, setInitialCards] = React.useState([]);


    React.useEffect(() => {
        api.getUserinfo()
            .then((res) => {
                setUserName(res.name)
                setUserAvatar(res.avatar)
                setUserDescription(res.about)
            })
            .catch((err) => {
                console.log(err.status);
            });

    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setInitialCards(res);

            })
            .catch((err) => {
                console.log(err.status);
            });

    }, []);

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={userAvatar} alt="Аватар пользователя" className="profile__avatar" />
                    <button className="profile__avatar-change-button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__container">
                    <h1 className="profile__user-name">{userName}</h1>
                    <p className="profile__user-info">{userDescription}</p>
                    <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={props.onEditProfile} ></button>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={props.onAddNewPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => {
                    return (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={props.onCardClick}
                            onRemovePlace={props.onRemovePlace}
                        />
                    );
                })}
            </section>
        </main>
    );
}

export default Main;