import { Link } from 'react-router-dom';
import logoPath from '../images/logo.svg';
import BurgerMenu from './BurgerMenu';
import { useState } from 'react';

function Header({children, pathName, handleLogin, userEmail, loggedIn}) {
  function handleClick() {
    if (loggedIn) {
      handleLogin();
      localStorage.removeItem('jwt');
      handleBurger();
    }
  };
  function handleBurger() {
    setIsBurgerOpen(!isBurgerOpen);
  }
  
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <header className="header page__header">
        <img src={logoPath} alt="логотип соцсети Mesto Russia" className="header__logo logo" />
        {loggedIn ? <><BurgerMenu isBurgerOpen={isBurgerOpen} handleBurger={handleBurger} /><div className="burger-info"><p className="burger-info__email">{userEmail}</p>
        <Link to={pathName} onClick={handleClick} className='burger-info__link' relative="path" replace="true">{children}</Link></div></> : <><p className="header__email">{userEmail}</p>
        <Link to={pathName} onClick={handleClick} className='header__link' relative="path" replace="true">{children}</Link></> }
    </header>
  );
};
export default Header;