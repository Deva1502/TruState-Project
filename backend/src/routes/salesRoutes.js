const express = require('express');
const router = express.Router();
const { getSales, getFilterOptions, getSaleById } = require('../controllers/salesController');

router.get('/', getSales);
router.get('/filters', getFilterOptions);
router.get('/:id', getSaleById);

module.exports = router;
