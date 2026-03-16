import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { GSAPProvider } from './components/providers.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GSAPProvider>
        <App />
      </GSAPProvider>
    </BrowserRouter>
  </StrictMode>,
);
