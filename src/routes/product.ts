const express = require("express");
const router = express.Router();
const multer = require("multer");

//multer config

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "Z:/.dev/Projetos/ML/public/images/products");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

//controller require

const productsController = require("../controllers/productsController");

//get all products

router.get("/", productsController.index);

//creating a product

router.get("/create", productsController.create);
router.post("/create", upload.single("fileImg"), productsController.store);

//getting a product

router.get("/detail/:id", productsController.detail);

//editing a product

router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", upload.single("fileImg"), productsController.update);

//deleting a product

router.delete("/delete/:id", productsController.destroy);

module.exports = router;
