import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Repositories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
        };
        this.fetchRepos = this.fetchRepos.bind(this);
    }

    componentDidMount() {
        this.fetchRepos();
    }

    componentDidUpdate(prevProps) {
        if (this.props.username !== prevProps.username) {
            this.fetchRepos();
        }
    }

    fetchRepos() {
        const { username } = this.props;
        const apiEndPoint = `https://api.github.com/users/${username}/repos`;

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
        const { data } = this.state;
        const repos = data && data.map(repo => (
            <div key={repo.id}>
                { repo.name }
            </div>
        ));

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        { repos }
                    </div>
                </div>
            </div>
        );
    }
}

Repositories.propTypes = {
    username: PropTypes.string,
};

export default Repositories;
