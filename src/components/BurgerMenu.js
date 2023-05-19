

export default function BurgerMenu({isBurgerOpen, handleBurger}) {

  const burgerOpenClass = isBurgerOpen ? `burger-button_active ` : `` ;
  function handleClick() {
    handleBurger();
    if (!isBurgerOpen) {
      document.querySelector(".header").style = 'transform: translateY(142px); transition: transform .3s ease-in;'
      document.querySelector(".main").style = 'transform: translateY(142px); transition: transform .3s ease-in;'
      document.querySelector(".footer").style = 'transform: translateY(142px); transition: transform .3s ease-in;'
    }
    else {
      document.querySelector(".header").style = 'transform: translateY(0); transition: transform .3s ease-in;'
      document.querySelector(".main").style = 'transform: translateY(0); transition: transform .3s ease-in;'
      document.querySelector(".footer").style = 'transform: translateY(0); transition: transform .3s ease-in;'
    }
  };

  return (
    <div className={`burger-button ${burgerOpenClass}`} onClick={handleClick}>
      <div className="burger-button__line"></div>
      <div className="burger-button__line"></div>
      <div className="burger-button__line"></div>
    </div>
  );
}