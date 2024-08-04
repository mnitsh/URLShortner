const express = require("express");
const URL = require("../Models/url");
const { handlerGenerateNewShortURL ,handlerRedirectUser,handlerAnalytics} = require("../controllers/urlcontroller");

const router = express.Router();

router
    .post("/", handlerGenerateNewShortURL)
    .get('/:shortId',handlerRedirectUser)
    .get('/analytics/:id',handlerAnalytics)


module.exports = router;
