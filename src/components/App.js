import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';


import ErrorBoundary from './ErrorBoundary';
import NavBar from './NavBar';
import Search from './Search';
import Overview from './Overview';

import '../styles/App.scss';

const IntroPage = () => (
    <div className="jumbotron">
        <h1 className="display-4">Hello, world!</h1>
        <p className="lead">
            Use this page to search for Github Users!
        </p>
    </div>
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleInputChange(event) {
        this.setState({ inputValue: event.target.value });
    }

    handleSearch(event) {
        event.preventDefault();
        const { inputValue } = this.state;

        this.props.history.push(`/users/${inputValue}`);
    }

    render() {
        const { inputValue } = this.state;

        return ([
            <NavBar key="NavBar" />,
            <div key="Content" className="container">
                <ErrorBoundary>
                    <div className="row mt-5">
                        <div className="col-9">
                            <Route
                                exact
                                path="/"
                                component={IntroPage}
                            />
                            <Route
                                path="/users/:username"
                                component={Overview}
                            />
                        </div>
                        <div className="col-3">
                            <Search
                                onChange={this.handleInputChange}
                                onSubmit={this.handleSearch}
                                value={inputValue}
                            />
                        </div>
                    </div>
                </ErrorBoundary>
            </div>,
        ]);
    }
}

App.propTypes = {
    history: PropTypes.object,
};

export default hot(module)(App);
