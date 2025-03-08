const express = require('express');
const createListing = require('../controllers/listing.controllers');
const verifyToken = require('../utills/verifyUser');
const router= express.Router();


router.post('/create-list',verifyToken, createListing);


module.exports= router;
