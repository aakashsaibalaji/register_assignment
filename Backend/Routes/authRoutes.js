const express= require("express");
const AuthRoutes = require('../Controller/authController');
const router = express.Router();
router.post('/login',AuthRoutes.login);
router.post('/register',AuthRoutes.register);
module.exports=router;