import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import TicTacToe from './pages/TicTacToe';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tic-tac-toe' element={<TicTacToe />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
