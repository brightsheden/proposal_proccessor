import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import Routes from './components/IndexRoute'
import { UserProvider } from '../overview/Account';
import { ProposalProvider } from '../overview/proposal';

const outerTheme = createTheme({
  palette: {
    secondary: {
      main: "#fff",
    },
  }
})

function App() {
  return (
    <>
      <ThemeProvider theme={outerTheme}>
      <BrowserRouter>
        <UserProvider>
          <ProposalProvider>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right'}}>
              <Routes />
            </SnackbarProvider>
          </ProposalProvider>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
    </>
    
  );
}

export default App;