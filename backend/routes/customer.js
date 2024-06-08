const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customer.controller');

router.post('/get_flight_details', customerController.get_flight_details);
router.post('/check_booking', customerController.check_booking);
router.post('/viwe_ticket', customerController.viwe_ticket);
router.post('/gfsd', customerController.get_flight_schedule_details);
router.post('/getAircraft_db', customerController.getAircraft_db);

module.exports = router;