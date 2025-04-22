const express = require('express');
const router = express.Router();
const { Professor } = require('../models');

// listar professores
router.get("/", async (req, res) => {
    const professores = await Professor.findAll();
    res.render(
        "base",{
            title: "Professores",
            view: "professor/show",
            professores
        });
});

//adicionar categoria - form
router.get("/add", async (req, res) => {
    res.render(
        "base",{
            title: "Add professor",
            view: "professor/add",
        });
});

//adicionar categoria - bd
router.post("/add", async (req, res) => {
    await Professor.create({
        nome: req.body.nome,
    });
    res.redirect("/professor");
});

//Editar categoria - form
router.get("/edit/:id", async (req, res) => {
    const professor = await Professor.findByPk(req.params.id);
    res.render(
        "base",{
            title: "Edit professor",
            view: "professor/edit",
            professor
        });
});

//editar categoria - bd
router.post("/edit/:id", async (req, res) => {
    await Professor.update({
        nome: req.body.nome,
    }, {
        where: {id: req.params.id},
    });
    res.redirect("/professor");
});

// Deletar categoria
router.post("/delete/:id",  async (req, res) => {
    await Professor.destroy({ where: { id: req.params.id } });
    res.redirect("/professor");
  });
  
  module.exports = router;