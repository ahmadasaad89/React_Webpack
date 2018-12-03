import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class FollowList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            isLoading: false,
        };
        this.fetchFollowList = this.fetchFollowList.bind(this);
    }

    componentDidMount() {
        this.fetchFollowList();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.url !== prevProps.match.url) {
            this.fetchFollowList();
        }
    }

    fetchFollowList() {
        const { url } = this.props.match;
        const apiEndPoint = `https://api.github.com${url}`;

        this.setState({ isLoading: true });
        axios(apiEndPoint, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github.v3+json',
            },
        }).then((response) => {
            this.setState({ data: response.data, isLoading: false });
        });
    }

    render() {
        const { data, isLoading } = this.state;
        const followList = data && data.map(listItem => (
            <div key={listItem.id} className="row mb-2">
                <div className="col-2">
                    <img src={listItem.avatar_url} alt={listItem.login} className="img-thumbnail rounded-circle" />
                </div>
                <div className="col-auto">
                    <a href={listItem.url} className="btn text-dark">{ listItem.login }</a>
                </div>
            </div>
        ));

        return (
            <div className="container">
                <p className="mb-4">
                    <mark>
                        The followers/following lists are fetched using github REST api (v3)
                    </mark>
                </p>
                { isLoading && 'Loading...' }
                { !isLoading && followList }
            </div>
        );
    }
}

FollowList.propTypes = {
    match: PropTypes.object,
};

export default FollowList;
