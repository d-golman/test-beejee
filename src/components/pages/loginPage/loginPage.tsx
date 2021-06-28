import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { login } from '../../../service/services';
import { checkLogin } from '../../../store/actions/userActions';
import './loginPage.sass';

const LoginPage = () => {

  const { logged } = useTypedSelector(state => state.user);
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const dispatch = useDispatch();


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(event.currentTarget)
      .then((status: string | null) => {
        setLoginStatus(status);

        setTimeout(() => {
          setLoginStatus(null);
        }, 2000);
      })
      .then(() => {
        dispatch(checkLogin());
      });

  };

  if (logged) {
    return (
      <Redirect to='/' />
    );
  }
  return (
    <div className="login-page">
      <form className='post-form' onSubmit={handleSubmit}>
        <div className="form-group">
          <input required placeholder='Логин' type="username" name='username' />
        </div>
        <div className="form-group">
          <input required type="password" placeholder='Пароль' name='password' />
        </div>
        <input className='form-submit' type="submit" value={loginStatus ? loginStatus : 'Войти'} />
      </form>
    </div>
  );
};

export default LoginPage;
