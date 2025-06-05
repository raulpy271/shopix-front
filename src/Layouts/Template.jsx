
import { ThemeProvider } from "flowbite-react";
import Navbar from '@Components/Navbar';
import {willRedirectToLogin, RedirectComponent} from '@Components/Auth';
import Theme from '../Theme';

const Template = ({ children }) => {
  return (
    <ThemeProvider theme={Theme}>
      <Navbar/>
      <div className="p-10 flex justify-center">
        {(willRedirectToLogin()) ? RedirectComponent() : children}
      </div>
    </ThemeProvider>
  )
}

export default Template;
