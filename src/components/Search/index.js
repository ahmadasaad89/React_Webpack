import React from 'react';


const Search = props => ([
    <div key="input" className="form-group">
        <input
            className="form-control"
            key="input"
            onChange={props.onChange}
            type="text"
            value={props.inputValue}
            placeholder="search"
        />
    </div>,
    <button
        key="button"
        className="btn btn-primary"
        type="submit"
        onClick={props.onSubmit}
    >
        Search
    </button>,
]);

export default Search;
