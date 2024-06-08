const express = require('express');
const reportsController = require('../controllers/reports.controller');
const router = express.Router();

// routers
router.post('/passengers_lst/:type', reportsController.passengers_lst);
router.post('/npd/:type', reportsController.number_of_passengers_for_dest_range_db);
router.post('/TotalRevenue', reportsController.handleTotalRevenue_db);
router.post('/past_flight_db', reportsController.past_flight_db);

module.exports = router;
