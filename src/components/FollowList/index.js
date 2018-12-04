import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import parse from 'parse-link-header';
import InfiniteScroll from 'react-infinite-scroller';

class FollowList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: false,
            paginationInfo: {
                nextPage: 1,
                lastPage: 2,
            },
            hasMoreItems: true,
            url: this.props.match.url,
        };
        this.fetchFollowList = this.fetchFollowList.bind(this);
        this.fetchMoreResults = this.fetchMoreResults.bind(this);
    }

    componentDidMount() {
        this.fetchFollowList();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.url !== prevProps.match.url) {
            this.fetchFollowList();
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.match.url !== prevState.url) {
            return {
                data: [],
                hasMoreItems: true,
                paginationInfo: {
                    nextPage: 1,
                    lastPage: 2,
                },
                url: nextProps.match.url,
            };
        }

        return null;
    }

    fetchMoreResults() {
        const { url: pathname } = this.state;
        const {
            data,
            paginationInfo: {
                nextPage,
            },
        } = this.state;

        const githubUrl = `https://api.github.com${pathname}?per_page=50&page=${nextPage}`;

        axios(githubUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github.v3+json',
                authorization: 'Bearer e9732110533aa8f2b77499cae6fb5d1dadc94607',
            },
        }).then((response) => {
            const {
                next,
                last,
            } = !!response.headers.link && parse(response.headers.link);
            const moreData = [...data, ...response.data];
            const hasMoreItems = !!next;

            this.setState({
                data: moreData,
                hasMoreItems,
                paginationInfo: {
                    nextPage: next && next.page,
                    lastPage: last && last.page,
                },
            });
        });
    }

    fetchFollowList() {
        const { url } = this.props.match;
        const apiEndPoint = `https://api.github.com${url}?per_page=50`;

        this.setState({ isLoading: true });
        axios(apiEndPoint, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github.v3+json',
                authorization: 'Bearer e9732110533aa8f2b77499cae6fb5d1dadc94607',
            },
        }).then((response) => {
            const pagination = parse(response.headers.link);
            const hasMoreItems = pagination && !!pagination.next;

            this.setState({
                data: response.data,
                isLoading: false,
                paginationInfo: {
                    nextPage: pagination && pagination.next && pagination.next.page,
                    lastPage: pagination && pagination.last && pagination.last.page,
                },
                hasMoreItems,
            });
        });
    }

    render() {
        const {
            data,
            isLoading,
            hasMoreItems,
        } = this.state;

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

        const infiniteFollowList = (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.fetchMoreResults}
                hasMore={hasMoreItems}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                { followList }
            </InfiniteScroll>
        );

        return (
            <div className="container">
                <p className="mb-4">
                    <mark>
                        The followers/following lists are fetched using github REST api (v3)
                    </mark>
                </p>
                { isLoading && 'Loading...' }
                { !isLoading && infiniteFollowList }
            </div>
        );
    }
}

FollowList.propTypes = {
    match: PropTypes.object,
};

export default FollowList;
