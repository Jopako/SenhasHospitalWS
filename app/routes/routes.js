const express = require("express");
const path = require("path");

function createRoutes(clinicaPresenter, broadcast) {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
  });

  router.get("/painel-senhas", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "painel-senhas.html"));
  });

  router.get("/estado", (req, res) => {
    res.json(clinicaPresenter.getEstado());
  });

  router.get("/historico", (req, res) => {
    res.json(clinicaPresenter.getHistorico());
  });

  router.get("/medico", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "medico.html"));
  });

  router.post("/medico", (req, res) => {
    const estadoAtualizado = clinicaPresenter.chamarProxima();
    if (typeof broadcast === "function") {
      broadcast(estadoAtualizado);
    }
    res.json(estadoAtualizado);
  });

  router.get("/ws", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "ws.html"));
  });

  return router;
}

module.exports = createRoutes;
