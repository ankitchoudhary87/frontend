import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { subscribeUser } from './subscription';
ReactDOM.render(
    <Router>
      <App />
    </Router>,
  document.getElementById('root')
);
serviceWorker.register();
subscribeUser()