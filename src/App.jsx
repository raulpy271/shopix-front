
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Pages from './Pages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pages.Home/>}/>
        <Route path='/compras' element={<div><h1>Página de compras</h1></div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
