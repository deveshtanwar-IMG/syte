import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import Store from './store/Store.jsx';

const theme = createTheme({
  palette: {
    warning: {
      main: '#ffeb3b'
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
)
