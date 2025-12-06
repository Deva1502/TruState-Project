import React, { useState } from 'react';

const SearchBar = ({ onSearch, initialValue = '' }) => {
    const [value, setValue] = useState(initialValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(value);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <input
                type="text"
                className="input"
                placeholder="Search by Customer Name or Phone..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </form>
    );
};

export default SearchBar;
