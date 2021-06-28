import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Footer from './footer/footer';
import Navbar from './navbar/navbar';
import LoginPage from './pages/loginPage/loginPage';
import MainPage from './pages/mainPage/mainPage';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/login' exact component={LoginPage} />
        <Route path='*' exact component={() => <Redirect to='/' />} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
