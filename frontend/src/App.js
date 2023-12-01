import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Homepage from "./Homepage";
import { Helmet } from "react-helmet";
import './App.css'

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  components: {
    Switch: {
      variants: {
        dbk: {  // 'myStyle' is a custom name for your switch style
          track: {
            _checked: {
              bg: 'red',
            },
          },
        },
      },
    },
  },
  colors: {
    maryland: {
      red: "#BA0C2F",
      yellow: "#FFC425",
      black: "#000000",
      white: "#FFFFFF",
    },
    dbk: {
      red: "#E51D37",
      red_hover: "#F56565"
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