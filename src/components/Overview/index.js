import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Tabs from '../Tabs';

class Overview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
        };

        this.fetchUser = this.fetchUser.bind(this);
    }

    componentDidMount() {
        this.fetchUser();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.username !== prevProps.match.params.username) {
            this.fetchUser();
        }
    }

    fetchUser() {
        const { username } = this.props.match.params;
        const apiEndPoint = `https://api.github.com/users/${username}`;

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
        const {
            avatar_url: avatarUrl,
            login,
            bio,
        } = !!data && data;

        const { username } = this.props.match.params;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <img src={avatarUrl} alt={login} className="img-thumbnail" />
                    </div>
                    <div className="col-12 col-md-9">
                        { bio }
                    </div>
                </div>
                <div className="row">
                    <Tabs username={username} />
                </div>
            </div>
        );
    }
}

Overview.propTypes = {
    match: PropTypes.object,
};

export default Overview;
