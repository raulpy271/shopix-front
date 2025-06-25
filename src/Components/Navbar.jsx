
import {useState, useEffect} from 'react';
import { useMatch } from 'react-router-dom'
import { Navbar as Nav, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import {getMe, logout} from '@Components/Auth';
import storage from '@Controllers/storage';
import {getMyCart} from '@Controllers/api';


export function Navbar({cart, setCart}) {
  const [me, setMe] = useState(null);
  useEffect(() => {
    (async () => {
      if (!me) {
        const meRes = await getMe();
        setMe(meRes);
        const cartRes = await getMyCart();
        setCart(cartRes);
      }
    })();
  }, [me]);
  return (
    <Nav fluid rounded>
      <NavbarBrand href="/">

        <img src="/shopix-logo.png" className="ml-10 h-6 sm:h-9" alt="Shopix Logo" />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white pl-2">Shopix</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/" active={ useMatch("/") != null }>
          Home
        </NavbarLink>
        <NavbarLink href="/compras" active={ useMatch("/compras") != null }>
          Compras
        </NavbarLink>
      </NavbarCollapse>
      <NavbarToggle />
      <NavbarCollapse>
        <UserSideNavbar me={me} cart={cart}/>
      </NavbarCollapse>
    </Nav>
  );
}

export function UserSideNavbar({me, cart}) {
  return (
    <>
      {
        (me && me.username) ? (
          <>
            <NavbarLink href="/carrinho">
              <p> 🛒 Carrinho ({cart ? cart.items.length : 0}) </p>
            </NavbarLink>
            <NavbarLink href="/me">
              <img src={storage(`/user/${me["id"]}`)} className="inline mr-3 w-7 h-7 rounded-xl"/>
              {me?.username}
            </NavbarLink>
            <NavbarLink href="#" onClick={logout}>
              <p className="pr-10">Logout</p>
            </NavbarLink>
          </>
        ) : (
          <>
            <NavbarLink href="/login" active={ useMatch("/login") != null }>
              Login
            </NavbarLink>
            <NavbarLink href="/cadastrar" active={ useMatch("/cadastrar") != null }>
               <p className="pr-10">Cadastrar</p>
            </NavbarLink>
          </>
        )
      }
    </>
  )
}

export default Navbar;
