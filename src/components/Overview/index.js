import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/* Components */
import Tabs from '../Tabs';

class Overview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            error: null,
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

        this.setState({ data: null, error: false });

        axios(apiEndPoint, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github.v3+json',
            },
        }).then((response) => {
            this.setState({ data: response.data });
        }).catch(() => this.setState({ error: true }));
    }

    render() {
        const { data, error } = this.state;
        const {
            avatar_url: avatarUrl,
            bio,
            login,
            name,
        } = !!data && data;

        const { username } = this.props.match.params;

        return (
            <div className="container">
                { error && 'Sorry, there is no user with this name' }
                { data && ([
                    <div key="basicInfo" className="row">
                        <div className="col-12 col-md-3">
                            <img src={avatarUrl} alt={login} className="img-thumbnail" />
                        </div>
                        <div className="col-12 col-md-9">
                            <h3>
                                { login }
                                <small className="text-muted">
                                    &nbsp;
                                    { name }
                                </small>
                            </h3>
                            { bio }
                        </div>
                    </div>,
                    <div key="additionalInfo" className="row">
                        <Tabs username={username} data={data} />
                    </div>,
                ]) }
            </div>
        );
    }
}

Overview.propTypes = {
    match: PropTypes.object,
};

export default Overview;
