const express = require('express');
const { body, query } = require('express-validator')
const schoolController = require('../controllers/school.controller');

const router = express.Router();

router.post('/addSchool', 
    body('name').notEmpty().withMessage('Name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('latitude').isFloat().withMessage('Latitude must be a float'),
    body('longitude').isFloat().withMessage('Longitude must be a float'),
    schoolController.addSchool
);

router.get('/listSchools', 
    query('userLatitude').isFloat().withMessage('User latitude is required'),
    query('userLongitude').isFloat().withMessage('User longitude is required'),
    schoolController.listSchools
)

module.exports = router;