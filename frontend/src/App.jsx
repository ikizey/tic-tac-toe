import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Queue from './pages/Queue';
import Game from './pages/Game';

function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path='queue' element={<Queue />} />
        <Route path='game' element={<Game />} />
      </Route>
    </Routes>
  );
}

export default App;
