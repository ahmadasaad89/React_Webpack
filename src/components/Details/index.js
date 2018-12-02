import React from 'react';
import PropTypes from 'prop-types';

const Details = () => (
    <ul className="nav nav-tabs">
        <li className="nav-item">
            <a className="nav-link active" href="#">Active</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
        </li>
    </ul>
);

Details.propTypes = {
};

export default Details;
