
import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup, Dropdown, DropdownItem } from "flowbite-react";

export default function FooterComp() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterBrand
            href="/"
            src="/shopix-logo.png"
            alt="Shopix Logo"
            name="Shopix"
          />
          <FooterLinkGroup>
            <Dropdown label={<a>Registro</a>} inline>
              <DropdownItem href="/cadastro/produtos">
                  Registro de produtos
              </DropdownItem>
              <DropdownItem href="/cadastro/promocoes">
                  Registro de promoções 
              </DropdownItem>
              <DropdownItem>
                  Registro de fornecedores
              </DropdownItem>
            </Dropdown>
            <FooterLink href="#" className="pl-5">Sobre</FooterLink>
            <FooterLink href="#">Politica de Privacidade</FooterLink>
            <FooterLink href="#">Contato</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="#" by="Shopix™" year={new Date().getFullYear()} />
      </div>
    </Footer>
  );


}
