import React from 'react';

const FilterGroup = ({ title, options, selected, onChange }) => {
    const handleChange = (option) => {
        const newSelected = selected.includes(option)
            ? selected.filter(item => item !== option)
            : [...selected, option];
        onChange(newSelected);
    };

    return (
        <div className="filter-group">
            <span className="filter-title">{title}</span>
            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {options.map(option => (
                    <label key={option} className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={selected.includes(option)}
                            onChange={() => handleChange(option)}
                        />
                        {option}
                    </label>
                ))}
            </div>
        </div>
    );
};

const FilterPanel = ({ options, filters, onFilterChange, onClearFilters }) => {
    const handleMultiChange = (key, values) => {
        onFilterChange({ ...filters, [key]: values });
    };

    const handleRangeChange = (key, value) => {
        onFilterChange({ ...filters, [key]: value });
    };

    if (!options) return <div>Loading filters...</div>;

    return (
        <div className="card" style={{ padding: '16px' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '16px' }}>
                <h3 className="font-bold text-lg">Filters</h3>
                <button onClick={onClearFilters} className="text-sm text-blue-600 hover:underline" style={{ color: 'var(--primary)', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                    Reset
                </button>
            </div>

            <FilterGroup
                title="Region"
                options={options.regions || []}
                selected={filters.region || []}
                onChange={(vals) => handleMultiChange('region', vals)}
            />

            <FilterGroup
                title="Gender"
                options={options.genders || []}
                selected={filters.gender || []}
                onChange={(vals) => handleMultiChange('gender', vals)}
            />

            <FilterGroup
                title="Category"
                options={options.categories || []}
                selected={filters.category || []}
                onChange={(vals) => handleMultiChange('category', vals)}
            />

            <FilterGroup
                title="Payment Method"
                options={options.paymentMethods || []}
                selected={filters.paymentMethod || []}
                onChange={(vals) => handleMultiChange('paymentMethod', vals)}
            />

            <FilterGroup
                title="Tags"
                options={options.tags || []}
                selected={filters.tags || []}
                onChange={(vals) => handleMultiChange('tags', vals)}
            />

            <div className="filter-group">
                <span className="filter-title">Age Range</span>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        className="input"
                        value={filters.minAge || ''}
                        onChange={(e) => handleRangeChange('minAge', e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        className="input"
                        value={filters.maxAge || ''}
                        onChange={(e) => handleRangeChange('maxAge', e.target.value)}
                    />
                </div>
            </div>

            <div className="filter-group">
                <span className="filter-title">Date Range</span>
                <div className="flex flex-col gap-2">
                    <input
                        type="date"
                        className="input"
                        value={filters.startDate || ''}
                        onChange={(e) => handleRangeChange('startDate', e.target.value)}
                    />
                    <input
                        type="date"
                        className="input"
                        value={filters.endDate || ''}
                        onChange={(e) => handleRangeChange('endDate', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
