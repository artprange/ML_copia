const db = require("../../models");
const { op } = require("sequelize");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: async (req, res) => {
    const visitados = await db.Produto.findAll({
      where: { categoria: "visited" },
    });
    const ofertas = await db.Produto.findAll({
      where: { categoria: "on-sale" },
    });
    res.render("index", { visitados: visitados, ofertas: ofertas });
  },
  search: async (req, res) => {
    const busca = req.query.keywords;
    let resultado = null;

    if (
      await db.Produto.findOne({
        where: { nome_prod: { [Op.like]: `%${busca}%` } },
      })
    ) {
      resultado = await db.Produto.findOne({
        where: { nome_prod: { [Op.like]: `%${busca}%` } },
      });
    } else {
      resultado = "";
    }
    res.render("results", { resultado: resultado });
  },
  sale: async (req, res) => {
    const ofertas = await db.Produto;
    findAll({ where: { categoria: "on-sale" } });
    res.render("onsale", { ofertas: ofertas });
  },
  admin: (req, res) => {
    res.render("admin", { user: req.query.user });
  },
};

module.exports = controller;
