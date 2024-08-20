const express= require('express');
const router= express.Router();
const registerController= require('../controllers/registerControllers');
const path = require('path');

router.route('/')
.post(registerController)

module.exports = router;
