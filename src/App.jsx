
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Pages from './Pages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        {
          Pages.map((page, index) => <Route key={index} path={page.path} element={<page.component/>}/>)
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App
