const express = require("express");
const router = express.Router();
const { Sala, Categoria } = require("../models"); // Ajuste o caminho conforme necessário

// Mostrar todos os produtos
router.get("/", async (req, res) => {
  try {
    const sala = await Sala.findAll({
      include: [{ model: Sala, as: "Salas" }],
    });
    res.render("base", {
      title: "Sala",
      view: "salas/show",
      produtos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar produtos");
  }
});

// Formulário para adicionar um novo produto
router.get("/add", async (req, res) => {
  try {
    const sala = await salas.findAll();
    res.render("base", {
      title: "Add Sala",
      view: "salas/add",
      salas,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar categorias");
  }
});

// Adicionar um novo produto
router.post("/add", async (req, res) => {
  try {
    const { nome, salaId } = req.body;
    await Sala.create({
      nome,
      salaId,
    });
    res.redirect("/salas");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao adicionar produto");
  }
});

// Formulário para editar um produto
router.get("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sala = await Sala.findByPk(id, {
      include: [{ model: Sala, as: "salas" }],
    });
    const categorias = await Categorias.findAll();
    if (produto) {
      res.render("base", {
        title: "Edit sala",
        view: "salas/edit",
        produto,
        categorias,
      });
    } else {
      res.status(404).send("Produto não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar produto");
  }
});

// Atualizar um produto
router.post("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, salaId } = req.body;
    const sala = await Sala.findByPk(id);
    if (sala) {
      await sala.update({
        nome,
        salaId,
      });
      res.redirect("/salas");
    } else {
      res.status(404).send("Produto não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar o produto");
  }
});

// Deletar um produto
router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sala = await Sala.findByPk(id);
    if (Sala) {
      await sala.destroy();
      res.redirect("/salas");
    } else {
      res.status(404).send("Produto não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir produto");
  }
});

module.exports = router;
