import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Homepage from "./Homepage";
import { Helmet } from "react-helmet";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    maryland: {
      red: "#BA0C2F",
      yellow: "#FFC425",
      black: "#000000",
      white: "#FFFFFF",
    },
    dbk: {
      red: "#E51D37"
    },
    gray: {
      800: "#1c1b1b",
    },
  },
});


function App() {
  return (
    <ChakraProvider theme={theme}>
      <div>
        <Homepage />
      </div>
    </ChakraProvider>
  );
}

export default App;