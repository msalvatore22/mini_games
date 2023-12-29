import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import TicTacToe from './pages/TicTacToe';
import Snake from './pages/SnakeGame';
import Nav from './components/Nav';


function App() {

  return (
		<>
      <Nav></Nav>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/tic-tac-toe" element={<TicTacToe />} />
					<Route path="/snake" element={<Snake />} />
				</Routes>
			</BrowserRouter>
		</>
  );
}

export default App
