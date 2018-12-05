import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './components/App';

// configuring Apollo client
const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
        authorization: 'Bearer e9732110533aa8f2b77499cae6fb5d1dadc94607', // A token that grants read-only access to public information
    },
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});


const routes = (
    <ApolloProvider client={client}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </ApolloProvider>
);

ReactDOM.render(routes, document.getElementById('root'));
