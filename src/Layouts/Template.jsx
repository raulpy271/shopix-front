
import { ThemeProvider } from "flowbite-react";
import { useMatch } from 'react-router-dom'
import {useState, useEffect} from 'react';
import Navbar from '@Components/Navbar';
import Footer from '@Components/Footer';
import {loggedPages, willRedirectToLogin, RedirectComponent} from '@Components/Auth';

import { ToastContainer } from 'react-toastify';
import Theme from '../Theme';

const Template = ({ cart, setCart, children }) => {
  const needToBeLogged = loggedPages.filter((page) => useMatch(page) != null).length > 0;
  const [redirect, setRedirect] = useState(false);
  if (!setCart) {
    const s = useState(null);
    cart = s[0];
    setCart = s[1];
  }
  useEffect(() => {
    if (!redirect && needToBeLogged) {
      willRedirectToLogin()
        .then(redirectRes => setRedirect(redirectRes))
    }
  }, [redirect]);
  return (
    <ThemeProvider theme={Theme}>
      <Navbar cart={cart} setCart={setCart}/>
      <div className="p-10 flex justify-center">
        {redirect ? RedirectComponent() : children}
        <ToastContainer position="top-center"/>
      </div>
      <Footer/>
    </ThemeProvider>
  )
}

export default Template;
