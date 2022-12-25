import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import Game from './pages/Game';

function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path='queue' element={<Lobby />} />
        <Route path='game' element={<Game />} />
      </Route>
    </Routes>
  );
}

export default App;
