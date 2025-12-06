import React from 'react';

const SortDropdown = ({ sortBy, sortOrder, onSortChange }) => {
    const handleChange = (e) => {
        const [field, order] = e.target.value.split(':');
        onSortChange(field, order);
    };

    return (
        <select
            className="input"
            style={{ width: 'auto' }}
            value={`${sortBy}:${sortOrder}`}
            onChange={handleChange}
        >
            <option value="Date:desc">Newest First</option>
            <option value="Date:asc">Oldest First</option>
            <option value="Quantity:desc">Quantity (High-Low)</option>
            <option value="Quantity:asc">Quantity (Low-High)</option>
            <option value="Customer Name:asc">Customer (A-Z)</option>
            <option value="Customer Name:desc">Customer (Z-A)</option>
            <option value="Final Amount:desc">Amount (High-Low)</option>
            <option value="Final Amount:asc">Amount (Low-High)</option>
        </select>
    );
};

export default SortDropdown;
