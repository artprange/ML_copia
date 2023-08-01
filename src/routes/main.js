const express = require("express");
const router = express.router();
const adminMiddleware = require("../middlewares/admin");

const mainController = require("../controllers/mainController");
const { Router } = require("express");

// *** GET HOME PAGE ***

router.get("/", mainController.index);

// GET SEARCH RESULT

router.get("/search", mainController.search);

//GET ON SALE

router.get("/sale", mainController.sale);

// GET ADMIN
router.get("/admin", adminMiddleware, mainController.admin);

module.exports = router;
