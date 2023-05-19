import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../utils/auth';
import toolTipOk from '../images/tooltip-ok.svg';
import toolTipErr from '../images/tooltip-err.svg';

export default function Register(props) {
  const [formValue, setFormValue] = useState({email: '', password: ''});
  const {email, password} = formValue;
  const navigate = useNavigate();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const {email, password} = formValue;
    authApi.register({email, password})
      .then((data) => {
        navigate('/sign-in');
        props.setIsToolTipInfo({isOpen: true, imgPath: toolTipOk, text: 'Вы успешно зарегистрировались!'});
      })
      .catch((err) => {
        console.log(err);
        props.setIsToolTipInfo({isOpen: true, imgPath: toolTipErr, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
      });
  };

  return (
    <>
      <div className="auth page__auth">
        <p className="auth__title sign-title">Регистрация</p>
        <form onSubmit={handleSubmit} className="sign-form auth__form">
          <input className="sign-input" id="email" type="email" name="email" 
                 value={email} onChange={(e) => setFormValue({...formValue, email: e.target.value})} placeholder="Email" />
          <input autoComplete="new-password" className="sign-input" id="password" type="password" name="email"
                 value={password} onChange={(e) => setFormValue({...formValue, password: e.target.value})} placeholder="Пароль" />
          <button className="sign-form__button" type="submit">Зарегистрироваться</button>
        </form>
        <Link className='auth__link' to="/sign-in">Уже зарегистрированы? Войти</Link>
      </div>
    </>
  );
};