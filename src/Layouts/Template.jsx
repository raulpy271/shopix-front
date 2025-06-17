
import { ThemeProvider } from "flowbite-react";
import {useState, useEffect} from 'react';
import Navbar from '@Components/Navbar';
import {willRedirectToLogin, RedirectComponent} from '@Components/Auth';

import { ToastContainer } from 'react-toastify';
import Theme from '../Theme';

const Template = ({ cart, setCart, children }) => {
  if (!setCart) {
    const s = useState(null);
    cart = s[0];
    setCart = s[1];
  }
  return (
    <ThemeProvider theme={Theme}>
      <Navbar cart={cart} setCart={setCart}/>
      <div className="p-10 flex justify-center">
        {(willRedirectToLogin()) ? RedirectComponent() : children}
        <ToastContainer position="top-center"/>
      </div>
    </ThemeProvider>
  )
}

export default Template;
