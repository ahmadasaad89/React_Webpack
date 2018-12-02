import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import axios from 'axios';

import ErrorBoundary from './ErrorBoundary';
import NavBar from './NavBar';
import Search from './Search';
import Overview from './Overview';

import '../styles/App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            data: null,
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
        const apiEndPoint = `https://api.github.com/users/${inputValue}`;

        axios(apiEndPoint, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github.v3+json',
            },
        }).then((response) => {
            this.setState({ data: response.data });
        });
    }

    render() {
        const { inputValue, data } = this.state;
        return ([
            <NavBar key="navBar" />,
            <div key="content" className="container">
                <ErrorBoundary>
                    <form>
                        <div className="row mt-5">
                            <div className="col-9">
                                {
                                    data && (
                                        <Overview data={data} />
                                    )
                                }
                            </div>
                            <div className="col-3">
                                <Search
                                    onChange={this.handleInputChange}
                                    onSubmit={this.handleSearch}
                                    value={inputValue}
                                />
                            </div>
                        </div>
                    </form>
                </ErrorBoundary>
            </div>,
        ]);
    }
}

export default hot(module)(App);
