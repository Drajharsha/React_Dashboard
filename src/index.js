import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/root';
import configureStore from './store/store';
import reportWebVitals from './reportWebVitals';


document.addEventListener('DOMContentLoaded', () => {
  let store
  let preloadedState = {};
  store = configureStore(preloadedState);
  window.store = store;
  const root = document.getElementById('root');
  ReactDOM.render(
    <React.StrictMode>
      <Root store={store} />
    </React.StrictMode>,
    root
  );
  reportWebVitals();
});