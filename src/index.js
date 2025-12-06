import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';   // optional: your styles

import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { FormProvider } from './context/FormContext';
import { CartProvider } from './context/CartContext'; 
import { CategoryFormProvider } from './context/CategoryFormContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
       <UserProvider>
        <FormProvider>
          <CartProvider>
          <CategoryFormProvider>
           <App />
           </CategoryFormProvider>
           </CartProvider>
        </FormProvider>
     
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
