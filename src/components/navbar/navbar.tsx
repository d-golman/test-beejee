import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { logout } from '../../service/services';
import { checkLogin } from '../../store/actions/userActions';
import './navbar.sass';

const Navbar = () => {
  const dispatch = useDispatch();
  const { logged } = useTypedSelector(state => state.user);

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  const handleLogout = () => {
    logout();
    dispatch(checkLogin());
  };

  return (
    <nav className='navbar'>
      <div className="container">
        <NavLink className='navbar-link' exact to='/'>Главная</NavLink>
        {logged ? <span className='navbar-link' onClick={handleLogout}>Выйти</span>
          : <NavLink exact className='navbar-link' to='/login'>Войти</NavLink>}
      </div>
    </nav>
  );
};

export default Navbar;
