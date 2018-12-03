import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';

const Repositories = Loadable({
    loader: () => import('../Repositories'),
    loading: () => 'LoOoOoading...',
});

const FollowList = Loadable({
    loader: () => import('../FollowList'),
    loading: () => 'LoOoOoading...',
});

const Tabs = props => (
    <div className="container">
        <div className="row">
            <div className="col-12 col-md-3" />
            <div className="col-12 col-md-9">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>
                                <Link className="btn text-center" to={`/users/${props.username}/repositories`}>
                                    <h6>{ props.data.public_repos }</h6>
                                    <p>Repositories</p>
                                </Link>
                            </td>
                            <td>
                                <Link className="btn text-center" to={`/users/${props.username}/followers`}>
                                    <h6>{ props.data.followers }</h6>
                                    <p>Followers</p>
                                </Link>
                            </td>
                            <td>
                                <Link className="btn text-center" to={`/users/${props.username}/following`}>
                                    <h6>{ props.data.following }</h6>
                                    <p>Following</p>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Switch>
                    <Route path="/users/:username/followers" component={FollowList} />
                    <Route path="/users/:username/following" component={FollowList} />
                    <Route path="/users/:username" render={() => (<Repositories username={props.username} />)} />
                </Switch>
            </div>
        </div>
    </div>
);

Tabs.propTypes = {
    username: PropTypes.string,
    data: PropTypes.object,
};

export default Tabs;
