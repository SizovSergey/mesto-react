import React from 'react';

const AuthTemplate = ({ title,name,buttonText,children }) => {
    return (
        <div className='AuthTemplate__container'>
            <h2 className='AuthTemplate__title'>{title}</h2>
            <form className='AuthTemplate__form'>
             {children}
             <button className='AuthTemplate__form_button'>{buttonText}</button>
            </form>
            <p className='AuthTemplate__text'>Уже зарегистрированы? Войти</p>
        </div>
    );
}

export default AuthTemplate;