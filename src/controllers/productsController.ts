const db = require("../../models");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // root - showing all goods
  index: async (req, res) => {
    const products = await db.Produto.findAll();
    res.render("products", { products: products });
  },
  // about - single good
  detail: async (req, res) => {
    let productID = req.params.id;
    const product = await db.Produto.findByPk(productID);
    res.render("detail", { product: product });
  },
  // creating
  create: (req, res) => {
    res.render("product-create-form");
  },
  //creating - storage
  store: async (req, res) => {
    const newProduct = {
      nome_prod: null,
      preco: null,
      desconto: null,
      categoria: null,
      descricao: null,
      img: null,
    };
    newProduct.nome_prod = req.body.nome_prod;
    newProduct.descricao = req.body.descricao;
    newProduct.preco = Number(req.body.preco.replace(",", "."));
    newProduct.desconto = Number(req.body.desconto);
    newProduct.img = req.file.filename;
    newProduct.categoria = req.body.categoria;

    await db.Produto.create(newProduct);
    res.render("product-create-form");
  },
  //updating - editing
  edit: async (req, res) => {
    let productID = req.params.id;
    const produto = await db.Produto.findByPk(productID);
    res.render("product-edit-form", { produto: produto });
  },
  //method to update
  update: async (req, res) => {
    let productID = req.params.id;
    let produto = await db.Produto;

    await produto.update(
      {
        nome_prod: req.body.nome_prod,
        descricao: req.body.descricao,
        preco: Number(req.body.preco.replace(",", ".")),
        desconto: Number(req.body.desconto),
        img: req.file.filename,
        categoria: req.body.categoria,
      },
      { where: { id: productID } }
    );

    let produtoFiltrado = await db.Produto.findByPk(productID);

    res.render("product-edit-form", { produto: produtoFiltrado });
  },

  //deleting a single good DESTROY
  destroy: async (req, res) => {
    let productID = req.params.id;
    let produto = await db.Produto;
    await produto.destroy({ where: { id: productID } });
    // let index = req.params.id - 1
    // products.splice(index, 1);
    // let productsJSON = JSON.stringify(products)
    // fs.writeFileSync(productsFilePath, productsJSON) - nevermind

    res.render("product-create-form");
  },
};

module.exports = controller;
