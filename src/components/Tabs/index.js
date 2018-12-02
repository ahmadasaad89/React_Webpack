import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';

import Repositories from '../Repositories';
import FollowList from '../FollowList';

const Tabs = props => (
    <div className="container">
        <div className="row">
            <div className="col-12 col-md-3" />
            <div className="col-12 col-md-9">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link className="nav-link active" to={`/user/${props.username}/repositories`}>Repositories</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/user/${props.username}/Followers`}>Followers</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/user/${props.username}/Following`}>Following</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path="/user/:username/Followers" component={FollowList} />
                    <Route path="/user/:username/Following" component={FollowList} />
                    <Route path="/user/:username" render={() => (<Repositories username={props.username} />)} />
                </Switch>
            </div>
        </div>
    </div>
);

Tabs.propTypes = {
    username: PropTypes.string,
};

export default Tabs;
