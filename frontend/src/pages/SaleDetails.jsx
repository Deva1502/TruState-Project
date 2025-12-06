import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSaleById } from '../services/api';

const SaleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sale, setSale] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSale = async () => {
            try {
                const data = await fetchSaleById(id);
                setSale(data);
            } catch (error) {
                console.error("Failed to load details");
            } finally {
                setLoading(false);
            }
        };
        loadSale();
    }, [id]);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!sale) return <div className="p-8 text-center">Transaction not found.</div>;

    const Section = ({ title, children }) => (
        <div className="mb-4">
            <h3 className="font-bold text-gray-500 text-sm uppercase mb-2" style={{ letterSpacing: '0.05em' }}>{title}</h3>
            <div className="grid grid-cols-2 gap-4">
                {children}
            </div>
        </div>
    );

    const Item = ({ label, value }) => (
        <div>
            <span className="block text-xs text-gray-500">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );

    return (
        <div className="container" style={{ maxWidth: '800px', padding: '40px 20px' }}>
            <button onClick={() => navigate('/')} className="btn mb-4">
                ← Back to Dashboard
            </button>

            <div className="card p-8">
                <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">{sale['Customer Name']}</h1>
                        <p className="text-gray-500">{sale['Transaction ID']}</p>
                    </div>
                    <span className={`badge ${sale['Order Status'] === 'Completed' ? 'badge-green' : 'badge-gray'}`}>
                        {sale['Order Status']}
                    </span>
                </div>

                <Section title="Customer Info">
                    <Item label="Email / Phone" value={sale['Phone Number']} />
                    <Item label="Region" value={sale['Customer Region']} />
                    <Item label="Age" value={sale['Age']} />
                    <Item label="Gender" value={sale['Gender']} />
                </Section>

                <hr className="mb-4 border-gray-200" />

                <Section title="Product Details">
                    <Item label="Product Name" value={sale['Product Name']} />
                    <Item label="Brand" value={sale['Brand']} />
                    <Item label="Category" value={sale['Product Category']} />
                    <Item label="Tags" value={sale['Tags']} />
                </Section>

                <hr className="mb-4 border-gray-200" />

                <Section title="Payment & Delivery">
                    <Item label="Total Amount" value={`$${sale['Final Amount']}`} />
                    <Item label="Quantity" value={sale['Quantity']} />
                    <Item label="Payment Method" value={sale['Payment Method']} />
                    <Item label="Delivery Type" value={sale['Delivery Type']} />
                    <Item label="Date" value={sale['Date']} />
                </Section>
            </div>
        </div>
    );
};

export default SaleDetails;
