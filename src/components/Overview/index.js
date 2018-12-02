import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../Tabs';

const Overview = props => (
    <div className="container">
        <div className="row">
            <div className="col-12 col-md-3">
                <img src={props.data.avatar_url} alt={props.data.login} className="img-thumbnail" />
            </div>
            <div className="col-12 col-md-9">
                { props.data.bio }
            </div>
        </div>
        <div className="row">
            <Tabs />
        </div>
    </div>
);

Overview.propTypes = {
    data: PropTypes.object,
};

export default Overview;
