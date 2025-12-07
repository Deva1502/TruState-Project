import axios from 'axios';

const API = axios.create({
    baseURL: 'https://trustate-project-2.onrender.com/api/sales',
});

// Helper to clean empty params
const cleanParams = (params) => {
    const cleaned = {};
    Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '' && (Array.isArray(params[key]) ? params[key].length > 0 : true)) {
            cleaned[key] = params[key];
        }
    });
    return cleaned;
};

export const fetchSales = async (params) => {
    try {
        const cleaned = cleanParams(params);
        const response = await API.get('/', { params: cleaned });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const fetchFilterOptions = async () => {
    try {
        const response = await API.get('/filters');
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const fetchSaleById = async (id) => {
    try {
        const response = await API.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}
