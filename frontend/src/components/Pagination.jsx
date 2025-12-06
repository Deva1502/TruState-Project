import React from 'react';

const Pagination = ({ meta, onPageChange }) => {
    if (!meta) return null;
    const { currentPage, totalPages, totalItems, pageSize } = meta;

    return (
        <div className="flex items-center justify-between" style={{ marginTop: '24px' }}>
            <span className="text-sm text-gray-600" style={{ color: 'var(--text-secondary)' }}>
                Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, totalItems)}</span> of <span className="font-medium">{totalItems}</span> results
            </span>
            <div className="flex gap-2">
                <button
                    className="btn"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
                >
                    Previous
                </button>
                <button
                    className="btn"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
