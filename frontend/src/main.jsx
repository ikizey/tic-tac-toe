import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import PlayerContextProvider from './store/playerContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlayerContextProvider>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </PlayerContextProvider>
  </React.StrictMode>
);
