import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class FollowList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
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
        const followList = data && data.map(listItem => (
            <div key={listItem.id}>
                { listItem.login }
            </div>
        ));

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        { followList }
                    </div>
                </div>
            </div>
        );
    }
}

FollowList.propTypes = {
    match: PropTypes.object,
};

export default FollowList;
