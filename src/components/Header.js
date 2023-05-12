import logoPath from '../images/logo.svg';

function Header() {
  return (
    <header className="header page__header">
        <img src={logoPath} alt="логотип соцсети Mesto Russia" className="header__logo logo" />
    </header>
  );
};
export default Header;