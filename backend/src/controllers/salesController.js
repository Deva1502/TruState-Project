const { generateMockData } = require('../utils/mockDataGenerator');

// Generate data once on server start
// In a real app, this would be a database.
let SALES_DATA = generateMockData(500);

// Helper to parse comma-separated string to array
const parseArray = (input) => {
    if (!input) return [];
    if (Array.isArray(input)) return input;
    return input.split(',').map(item => item.trim());
};

const getSaleById = (req, res) => {
    const { id } = req.params;
    const sale = SALES_DATA.find(item => item['Transaction ID'] === id);
    if (sale) {
        res.json(sale);
    } else {
        res.status(404).json({ error: "Transaction not found" });
    }
};

const getSales = (req, res) => {
    try {
        let {
            q,
            sortBy,
            sortOrder,
            page = 1,
            limit = 10,
            // Filters
            region,
            gender,
            minAge,
            maxAge,
            category,
            tags,
            paymentMethod,
            startDate,
            endDate
        } = req.query;

        let results = [...SALES_DATA];

        // 1. Search
        if (q) {
            const query = q.toLowerCase();
            results = results.filter(item =>
                (item['Customer Name'] && item['Customer Name'].toLowerCase().includes(query)) ||
                (item['Phone Number'] && item['Phone Number'].toLowerCase().includes(query))
            );
        }

        // 2. Filters

        // Multi-select Region
        const regions = parseArray(region);
        if (regions.length > 0) {
            results = results.filter(item => regions.includes(item['Customer Region']));
        }

        // Multi-select Gender
        const genders = parseArray(gender);
        if (genders.length > 0) {
            results = results.filter(item => genders.includes(item['Gender']));
        }

        // Age Range
        if (minAge) results = results.filter(item => item['Age'] >= Number(minAge));
        if (maxAge) results = results.filter(item => item['Age'] <= Number(maxAge));

        // Multi-select Category
        const categories = parseArray(category);
        if (categories.length > 0) {
            results = results.filter(item => categories.includes(item['Product Category']));
        }

        // Tags (check if item tags string contains any of the selected tags)
        const tagFilters = parseArray(tags);
        if (tagFilters.length > 0) {
            results = results.filter(item => {
                if (!item['Tags']) return false;
                const itemTags = item['Tags'].split(',').map(t => t.trim());
                return tagFilters.some(tag => itemTags.includes(tag));
            });
        }

        // Payment Method
        const payments = parseArray(paymentMethod);
        if (payments.length > 0) {
            results = results.filter(item => payments.includes(item['Payment Method']));
        }

        // Date Range
        if (startDate) results = results.filter(item => new Date(item['Date']) >= new Date(startDate));
        if (endDate) results = results.filter(item => new Date(item['Date']) <= new Date(endDate));

        // 3. Sorting
        if (sortBy) {
            const order = sortOrder === 'asc' ? 1 : -1;
            results.sort((a, b) => {
                let valA = a[sortBy];
                let valB = b[sortBy];

                // Special handling for Date sorting
                if (sortBy === 'Date') {
                    valA = new Date(valA);
                    valB = new Date(valB);
                }

                // Case insensitive string sort
                if (typeof valA === 'string') valA = valA.toLowerCase();
                if (typeof valB === 'string') valB = valB.toLowerCase();

                if (valA < valB) return -1 * order;
                if (valA > valB) return 1 * order;
                return 0;
            });
        } else {
            // Default sort: Date Newest First
            results.sort((a, b) => new Date(b['Date']) - new Date(a['Date']));
        }

        // 4. Pagination
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;
        const paginatedResults = results.slice(startIndex, endIndex);

        // Metadata for response
        const totalItems = results.length;
        const totalPages = Math.ceil(totalItems / limitNum);

        res.json({
            data: paginatedResults,
            meta: {
                totalItems,
                totalPages,
                currentPage: pageNum,
                pageSize: limitNum
            },
            // Return unique values for filters (optional, helpful for frontend)
            facets: {
                regions: [...new Set(SALES_DATA.map(i => i['Customer Region']))],
                categories: [...new Set(SALES_DATA.map(i => i['Product Category']))],
                tags: [...new Set(SALES_DATA.flatMap(i => i['Tags'].split(',').map(t => t.trim())))].sort()
            }
        });

    } catch (error) {
        console.error('Error processing sales data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getFilterOptions = (req, res) => {
    // Return all unique values for dropdowns
    try {
        const uniqueValues = {
            regions: [...new Set(SALES_DATA.map(i => i['Customer Region']))],
            genders: [...new Set(SALES_DATA.map(i => i['Gender']))],
            categories: [...new Set(SALES_DATA.map(i => i['Product Category']))],
            paymentMethods: [...new Set(SALES_DATA.map(i => i['Payment Method']))],
            tags: [...new Set(SALES_DATA.flatMap(i => i['Tags'].split(',').map(t => t.trim())))].sort()
        };
        res.json(uniqueValues);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

module.exports = { getSales, getFilterOptions, getSaleById };
