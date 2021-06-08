import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { myTheme } from './styles/theme';
import GlobalStyle from './styles/global-style';
import './index.css';
import { configureStore } from './store/configStore';

const { config, store } = configureStore();
config();

ReactDOM.render(
  <ThemeProvider theme={myTheme}>
    <Provider store={store}>
      <React.StrictMode>
        <GlobalStyle />
        <App />
      </React.StrictMode>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
