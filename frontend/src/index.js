import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import {Provider as ReduxProvider} from "react-redux";
import store from './redux/store';

const theme = extendTheme({
  colors: {
    brand: {
      100: "#dcff3e", 
      800: "#b0cc32 ",
      900: "#abc732",  
    },
    brand2: "b0cc32",
  },

})

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ReduxProvider store={store} >
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <App />
    </ChakraProvider>
    </ReduxProvider>   
  </StrictMode>
);


