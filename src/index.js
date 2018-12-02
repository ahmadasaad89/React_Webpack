import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App';

const routes = (
    <Router>
        <Route path="/" component={App} />
    </Router>
);

ReactDOM.render(routes, document.getElementById('root'));
