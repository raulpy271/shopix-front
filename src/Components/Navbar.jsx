
import {useState, useEffect} from 'react';
import { useMatch } from 'react-router-dom'
import { Navbar as Nav, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import {getMe, logout} from '@Components/Auth';
import storage from '@Controllers/storage';


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
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white pl-10">Shopix</span>
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
