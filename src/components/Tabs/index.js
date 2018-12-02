import React from 'react';
// import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

import Repositories from '../Repositories';
import FollowList from '../FollowList';

const Tabs = () => (
    <div className="container">
        <div className="row">
            <div className="col-12 col-md-3" />
            <div className="col-12 col-md-9">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/repositories">Repositories</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Followers">Followers</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Following">Following</Link>
                    </li>
                </ul>
                <Route path="/repositories" component={Repositories} />
                <Route path="/Followers" component={FollowList} />
            </div>
        </div>
    </div>
);

Tabs.propTypes = {
};

export default Tabs;
