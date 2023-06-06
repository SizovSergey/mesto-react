import React from 'react';
import AuthTemplate from './AuthTemplate';

const Login = (props) => {
    return (
        <AuthTemplate
            title="Вход"
            name="login"
            buttonText="Войти"
        >
            <label className="AuthTemplate__input-container" htmlFor="loginEmail">
                <input  type="email" className="AuthTemplate__input" id="loginEmail" placeholder="Email" name="logEmail"
                    required />
                <span id="loginEmail-error"></span>
            </label>
            <label className="AuthTemplate__input-container" htmlFor="loginPass">
                <input type="text" className="AuthTemplate__input" id="loginPass" placeholder="Пароль" name="LogPass" minLength="8" maxLength="200"
                    required />
                <span id="loginPass-error"></span>
            </label>
        </AuthTemplate>
    )
}

export default Login;