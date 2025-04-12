
import Navbar from '../Components/Navbar';

export default function Template({ children }) {
  return (
    <>
      <Navbar/>
      <div className="p-10">
        {children}
      </div>
    </>
  )
}
