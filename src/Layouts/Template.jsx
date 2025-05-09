
import Navbar from '@Components/Navbar';
import {willRedirectToLogin, RedirectComponent} from '@Components/Auth';

const Template = ({ children }) => {
  return (
    <>
      <Navbar/>
      <div className="p-10">
        {(willRedirectToLogin()) ? RedirectComponent() : children}
      </div>
    </>
  )
}

export default Template;
