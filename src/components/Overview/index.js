import React from 'react';
import PropTypes from 'prop-types';

import Details from '../Details';

const Overview = props => (
    <div className="container">
        <div className="row">
            <div className="col-12 col-md-3">
                <img src={props.data.avatar_url} alt={props.data.login} className="img-thumbnail" />
            </div>
            <div className="col-12 col-md-9">
                { props.data.bio }
                <Details />
            </div>
        </div>
    </div>
);

Overview.propTypes = {
    data: PropTypes.object,
};

export default Overview;
