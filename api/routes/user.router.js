 const express = require('express');
const { test, updateUser, deleteUser } = require('../controllers/user.controllers');
const  verifyToken  = require('../utills/verifyUser');
const router= express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);




module.exports = router;