import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../utils/auth';
import toolTipErr from '../images/tooltip-err.svg';

export default function Login({handleLogin, setIsToolTipInfo, setUserEmail}) {
  const [formValue, setFormValue] = useState({email: '', password: ''});
  const {email, password} = formValue;
  const navigate = useNavigate();

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authApi.checkToken(jwt)
        .then((data) => {
          handleLogin();
          navigate("/");
          setUserEmail(data.data.email);
        })
        .catch(err => console.log(err));
    }
  }

  useEffect( () => {
    tokenCheck();
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const {email, password} = formValue;
    authApi.login({email, password})
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          handleLogin();
          navigate("/");
          setUserEmail(email);
        }
        })
      .catch((err) => {
        console.log(err);
        setIsToolTipInfo({isOpen: true, imgPath: toolTipErr, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
      });
  };

  return (
    <>
      <div className="auth page__auth">
        <p className="auth__title sign-title">Вход</p>
        <form onSubmit={handleSubmit} className="sign-form auth__form">
          <input className="sign-input" id="email" type="email" name="email" 
                 value={email} onChange={(e) => setFormValue({...formValue, email: e.target.value})} placeholder="Email" />
          <input className="sign-input" id="password" type="password" name="email"
                 value={password} onChange={(e) => setFormValue({...formValue, password: e.target.value})} placeholder="Пароль" />
          <button className="sign-form__button" type="submit">Войти</button>
        </form>
      </div>
    </>
  );
};