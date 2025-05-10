
import {useState, useEffect} from 'react';
import { useMatch } from 'react-router-dom'
import { Navbar as Nav, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import {getMe, logout} from '@Components/Auth';


export function Navbar() {
  const [me, setMe] = useState(null);
  useEffect(() => {
    (async () => {
      if (!me) {
        const meRes = await getMe();
        setMe(meRes);
      }
    })();
  }, [me]);
  return (
    <Nav fluid rounded>
      <NavbarBrand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Shopix</span>
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
        <UserSideNavbar me={me}/>
      </NavbarCollapse>
    </Nav>
  );
}

export function UserSideNavbar({me}) {
  return (
    <>
      {
        (me && me.username) ? (
          <>
            <NavbarLink href="/me">
              <img src="/src/assets/user.svg" className="inline mr-4 h-6 dark:invert-60 invert-30"/>
              {me?.username}
            </NavbarLink>
            <NavbarLink href="#" onClick={logout}>
              Logout
            </NavbarLink>
          </>
        ) : (
          <>
            <NavbarLink href="/login" active={ useMatch("/login") != null }>
              Login
            </NavbarLink>
            <NavbarLink href="/cadastrar" active={ useMatch("/cadastrar") != null }>
              Cadastrar
            </NavbarLink>
          </>
        )
      }
    </>
  )
}

export default Navbar;
