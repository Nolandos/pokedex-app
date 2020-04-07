import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ReactDOM from 'react-dom';
import App from './App';

const Root = () => (
    <Provider store={store}>
        <Router>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Router>
    </Provider> 
);

ReactDOM.render(<Root />, document.getElementById('root'));