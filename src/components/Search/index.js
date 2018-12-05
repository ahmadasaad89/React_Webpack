import React from 'react';
import PropTypes from 'prop-types';


const Search = props => (
    <form>
        <div key="input" className="form-group">
            <input
                className="form-control"
                key="input"
                onChange={props.onChange}
                type="text"
                value={props.inputValue}
                placeholder="search by login name"
            />
        </div>
        <button
            key="button"
            className="btn btn-primary btn-block"
            type="submit"
            onClick={props.onSubmit}
        >
            Search
        </button>
    </form>
);

Search.propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    inputValue: PropTypes.string,
};

export default Search;
