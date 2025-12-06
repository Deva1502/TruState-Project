import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import SalesTable from '../components/SalesTable';
import Pagination from '../components/Pagination';
import SortDropdown from '../components/SortDropdown';
import ThemeToggle from '../components/ThemeToggle';
import { fetchSales, fetchFilterOptions } from '../services/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filterOptions, setFilterOptions] = useState(null);

    // Resizable Sidebar State
    const [sidebarWidth, setSidebarWidth] = useState(320);
    const isResizing = useRef(false);

    // State for all query params
    const [params, setParams] = useState({
        q: '',
        page: 1,
        limit: 10,
        sortBy: 'Date',
        sortOrder: 'desc',
        region: [],
        gender: [],
        category: [],
        paymentMethod: [],
        tags: [],
        minAge: '',
        maxAge: '',
        startDate: '',
        endDate: ''
    });

    // Load filter options on mount
    useEffect(() => {
        fetchFilterOptions().then(setFilterOptions).catch(console.error);
    }, []);

    // Fetch data when params change
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const response = await fetchSales(params);
                setData(response.data);
                setMeta(response.meta);
            } catch (error) {
                console.error("Failed to load data", error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(loadData, 300);
        return () => clearTimeout(timeoutId);
    }, [params]);

    // Resize Handlers
    const startResizing = (e) => {
        isResizing.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResizing);
    };

    const handleMouseMove = (e) => {
        if (isResizing.current) {
            // Constrain width
            const newWidth = Math.max(200, Math.min(600, e.clientX - 24)); // 24px padding correction
            setSidebarWidth(newWidth);
        }
    };

    const stopResizing = () => {
        isResizing.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', stopResizing);
    };

    const handleSearch = (q) => setParams(prev => ({ ...prev, q, page: 1 }));
    const handleFilterChange = (newFilters) => setParams(prev => ({ ...prev, ...newFilters, page: 1 }));
    const handleSortChange = (sortBy, sortOrder) => setParams(prev => ({ ...prev, sortBy, sortOrder }));
    const handlePageChange = (page) => setParams(prev => ({ ...prev, page }));

    const clearFilters = () => {
        setParams(prev => ({
            ...prev,
            region: [],
            gender: [],
            category: [],
            paymentMethod: [],
            tags: [],
            minAge: '',
            maxAge: '',
            startDate: '',
            endDate: '',
            page: 1
        }));
    };

    const handleRowClick = (item) => {
        navigate(`/sales/${item['Transaction ID']}`);
    };

    return (
        <div className="container" style={{ maxWidth: '1600px' }}>
            <header className="header flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Retail Sales Dashboard</h1>
                    <p className="text-gray-500">Manage and view your sales data</p>
                </div>
                <div className="flex gap-4 items-center">
                    <ThemeToggle />
                    <div style={{ width: '300px' }}>
                        <SearchBar onSearch={handleSearch} initialValue={params.q} />
                    </div>
                </div>
            </header>

            <div className="app-layout" style={{ gridTemplateColumns: `${sidebarWidth}px 1fr`, position: 'relative' }}>
                <aside className="sidebar" style={{ width: '100%' }}>
                    <FilterPanel
                        options={filterOptions}
                        filters={params}
                        onFilterChange={handleFilterChange}
                        onClearFilters={clearFilters}
                    />
                </aside>

                {/* Resize Handle */}
                <div
                    onMouseDown={startResizing}
                    style={{
                        position: 'absolute',
                        left: `${sidebarWidth + 12}px`, // Centered in the gap
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        cursor: 'col-resize',
                        backgroundColor: 'var(--border-color)',
                        borderRadius: '2px',
                        opacity: 0.5,
                        transition: 'opacity 0.2s'
                    }}
                    className="resize-handle hover:opacity-100"
                />

                <main style={{ marginLeft: '12px' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-lg">Transactions</h2>
                        <SortDropdown
                            sortBy={params.sortBy}
                            sortOrder={params.sortOrder}
                            onSortChange={handleSortChange}
                        />
                    </div>

                    <SalesTable
                        data={data}
                        loading={loading}
                        onRowClick={handleRowClick} // Pass click handler
                    />

                    <Pagination meta={meta} onPageChange={handlePageChange} />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
