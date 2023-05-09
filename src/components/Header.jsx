import React from 'react';
import logo from '../images/logo.svg'



const Header = () => {

return (
    <>
<header class="header">
    <img src={logo} alt="логотип белый" class="header__logo" />
</header>
</>
);
}

export default Header;