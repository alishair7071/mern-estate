const express = require('express');
const { createListing, deleteListing } = require('../controllers/listing.controllers');
const verifyToken = require('../utills/verifyUser');
const router= express.Router();


router.post('/create-list',verifyToken, createListing);
router.delete('/delete/:id',verifyToken, deleteListing);



module.exports= router;
