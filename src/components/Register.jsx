import React from 'react';
import AuthTemplate from './AuthTemplate';

const Register = (props) => {
    return (
        <AuthTemplate
            title="Регистрация"
            name="register"
            buttonText="Зарегестрироваться"
        >
            <label className="AuthTemplate__input-container" htmlFor="regEmail">
                <input  type="email" className="AuthTemplate__input" id="regEmail" placeholder="Email" name="regEmail"
                    required />
                <span id="loginEmail-error"></span>
            </label>
            <label className="AuthTemplate__input-container" htmlFor="regPass">
                <input type="text" className="AuthTemplate__input" id="regPass" placeholder="Пароль" name="regPass" minLength="8" maxLength="200"
                    required />
                <span id="loginPass-error"></span>
            </label>
        </AuthTemplate>
    )
}

export default Register;