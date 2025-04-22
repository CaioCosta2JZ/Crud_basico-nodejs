const express = require("express");
const router = express.Router();
const { Curso, Categoria } = require("../models/cursos"); // Ajuste o caminho conforme necessário

// Mostrar todos os produtos
router.get("/", async (req, res) => {
  try {
    const cursos = await Curso.findAll({
      include: [{ model: Categoria, as: "Categoria" }],
    });
    res.render("base", {
      title: "Cursos",
      view: "cursos/show",
      produtos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar cursos");
  }
});

// Formulário para adicionar um novo produto
router.get("/add", async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.render("base", {
      title: "Add Produto",
      view: "produtos/add",
      categorias,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar categorias");
  }
});

// Adicionar um novo produto
router.post("/add", async (req, res) => {
  try {
    const { nome, cursoId } = req.body;
    await Curso.create({
      nome,
      cursoId,
    });
    res.redirect("/cursos");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao adicionar curso");
  }
});

// Formulário para editar um produto
router.get("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cursos = await Curso.findByPk(id, {
      include: [{ model: Categoria, as: "Categoria" }],
    });
    const categorias = await Categoria.findAll();
    if (cursos) {
      res.render("base", {
        title: "Edit Curso",
        view: "cursos/edit",
        cursos,
        categorias,
      });
    } else {
      res.status(404).send("curso não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar curso");
  }
});

// Atualizar um produto
router.post("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cursoId } = req.body;
    const cursos = await Curso.findByPk(id);
    if (cursos) {
      await cursos.update({
        nome,
        cursoId,
      });
      res.redirect("/cursos");
    } else {
      res.status(404).send("curso não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar o curso");
  }
});

// Deletar um produto
router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cursos = await Curso.findByPk(id);
    if (cursos) {
      await cursos.destroy();
      res.redirect("/cursos");
    } else {
      res.status(404).send("Curso não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir curso");
  }
});

module.exports = router;
