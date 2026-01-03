import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';   // optional: your styles

import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { ServiceFormProvider } from './context/ServiceFormContext';
import { CartProvider } from './context/CartContext'; 
import { CategoryFormProvider } from './context/CategoryFormContext'; 
import {ServiceTypeFormProvider} from './context/ServiceTypeFormContext';
import { LanguageProvider } from './context/LanguageContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LanguageProvider>
    <ThemeProvider>
       <UserProvider>
        <ServiceFormProvider>
          <CartProvider>
          <CategoryFormProvider>
            <ServiceTypeFormProvider>
           <App />
           </ServiceTypeFormProvider>
           </CategoryFormProvider>
           </CartProvider>
        </ServiceFormProvider>
     
      </UserProvider>
    </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
