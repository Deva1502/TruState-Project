const fs = require('fs');
const path = require('path');

// Helper to get random item from array
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper to get random number in range
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper to get random float
const getRandomFloat = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(2));

// Helper to format date
const formatDate = (date) => date.toISOString().split('T')[0];

const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Chris', 'Jessica', 'Robert', 'Laura', 'James', 'Linda', 'William', 'Elizabeth', 'Richard', 'Jennifer', 'Joseph', 'Maria', 'Thomas', 'Susan'];
const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson'];
const regions = ['North', 'South', 'East', 'West'];
const cities = {
    'North': ['New York', 'Boston', 'Chicago'],
    'South': ['Miami', 'Houston', 'Atlanta'],
    'East': ['Philadelphia', 'Washington D.C.', 'Charlotte'],
    'West': ['Los Angeles', 'Seattle', 'San Francisco']
};
const customerTypes = ['Regular', 'Premium', 'New', 'VIP'];
const productCategories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];
const brands = ['BrandA', 'BrandB', 'BrandC', 'BrandD', 'BrandE'];
const paymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'Cash', 'UPI'];
const orderStatuses = ['Completed', 'Pending', 'Cancelled', 'Returned'];
const deliveryTypes = ['Standard', 'Express', 'Same Day'];
const tagsList = ['New Arrival', 'Best Seller', 'Discounted', 'Limited Edition', 'Eco-friendly'];

const generateMockData = (count = 200) => {
    const data = [];
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');

    for (let i = 1; i <= count; i++) {
        const custRegion = getRandom(regions);
        const city = getRandom(cities[custRegion]);
        const gender = getRandom(['Male', 'Female']);
        const firstName = getRandom(firstNames);
        const lastName = getRandom(lastNames);
        const name = `${firstName} ${lastName}`;
        const age = getRandomInt(18, 70);

        const price = getRandomFloat(10, 2000);
        const quantity = getRandomInt(1, 10);
        const discount = getRandomInt(0, 30);
        const totalAmount = price * quantity;
        const finalAmount = totalAmount * (1 - discount / 100);

        const salesDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

        data.push({
            // Customer Fields
            "Transaction ID": `TXN-FIXED-${10000 + i}`,
            "Customer ID": `CUST-${1000 + i}`,
            "Customer Name": name,
            "Phone Number": `555-${getRandomInt(100, 999)}-${getRandomInt(1000, 9999)}`,
            "Gender": gender,
            "Age": age,
            "Customer Region": custRegion,
            "Customer Type": getRandom(customerTypes),

            // Product Fields
            "Product ID": `PROD-${getRandomInt(100, 999)}`,
            "Product Name": `${getRandom(brands)} ${getRandom(['Widget', 'Gadget', 'Tool', 'Device', 'Apparel'])} ${getRandomInt(1, 100)}`,
            "Brand": getRandom(brands),
            "Product Category": getRandom(productCategories),
            "Tags": [getRandom(tagsList), getRandom(tagsList)].filter((v, i, a) => a.indexOf(v) === i).join(', '), // Unique tags

            // Sales Fields
            "Quantity": quantity,
            "Price per Unit": price,
            "Discount Percentage": discount,
            "Total Amount": parseFloat(totalAmount.toFixed(2)),
            "Final Amount": parseFloat(finalAmount.toFixed(2)),

            // Operational Fields
            "Date": formatDate(salesDate),
            "Payment Method": getRandom(paymentMethods),
            "Order Status": getRandom(orderStatuses),
            "Delivery Type": getRandom(deliveryTypes),
            "Store ID": `STORE-${getRandomInt(1, 10)}`,
            "Store Location": city,
            "Salesperson ID": `EMP-${getRandomInt(100, 200)}`,
            "Employee Name": `${getRandom(firstNames)} ${getRandom(lastNames)} (Staff)`
        });
    }
    return data;
};

// If run directly, save to file
if (require.main === module) {
    const data = generateMockData();
    fs.writeFileSync(path.join(__dirname, 'mock_data.json'), JSON.stringify(data, null, 2));
    console.log('Mock data generated successfully.');
}

module.exports = { generateMockData };
