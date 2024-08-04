const express = require("express");
const user = require("../Models/user");
const {handlerCreateUser,handelUserLogin} = require("../controllers/usercontroller")

const router = express.Router();


router
    .post('/',handlerCreateUser)
    .post('/login',handelUserLogin);


module.exports = router;
