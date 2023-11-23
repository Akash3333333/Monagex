import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
     <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.Fragment>
); 