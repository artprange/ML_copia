const express = require("express");
const router = express.router();

const usersController = require("../controllers/usersController");

router.get("/cadastrar", usersController.cadastro);
router.post("/cadastrar", usersController.salvarCadastro);

router.get("/login", usersController.login);
router.post("/login", usersController.loginExec);

module.exports = router;
