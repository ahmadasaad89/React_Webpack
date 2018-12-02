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
            <a
                key={repo.id}
                href={repo.html_url}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                { repo.name }
                <span className="badge badge-primary badge-pill">
                    { repo.stargazers_count }
                    ★
                </span>
            </a>
        ));

        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="list-group list-group-flush">
                            { repos }
                        </div>
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
