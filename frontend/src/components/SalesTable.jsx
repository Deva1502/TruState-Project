import React from 'react';

const SalesTable = ({ data, loading, onRowClick }) => {
    if (loading) return <div className="text-center p-8">Loading...</div>;
    if (!data || data.length === 0) return <div className="text-center p-8">No results found.</div>;

    return (
        <div className="card table-container">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Region</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            onClick={() => onRowClick && onRowClick(item)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{item.Date}</td>
                            <td>
                                <div>{item['Customer Name']}</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item['Phone Number']}</div>
                            </td>
                            <td>{item['Customer Region']}</td>
                            <td>
                                <div>{item['Product Name']}</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.Brand}</div>
                            </td>
                            <td>{item['Product Category']}</td>
                            <td>{item.Quantity}</td>
                            <td>
                                <div>${item['Final Amount']}</div>
                                {item['Discount Percentage'] > 0 && <span className="badge badge-green">-{item['Discount Percentage']}%</span>}
                            </td>
                            <td>
                                <span className={`badge ${item['Order Status'] === 'Completed' ? 'badge-green' : item['Order Status'] === 'Cancelled' ? 'badge-white' : 'badge-blue'}`} style={{ border: item['Order Status'] === 'Cancelled' ? '1px solid #e2e8f0' : 'none' }}>
                                    {item['Order Status']}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;
