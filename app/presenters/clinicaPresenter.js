const clinicaModel = require("../models/clinicaModel");

function getHistorico(){
  return clinicaModel.getHistorico();
}

function getEstado() {
  return clinicaModel.getEstado();
}

function chamarProxima() {
  return clinicaModel.chamarProxima();
}

function handleWsConnection(ws, broadcast) {
  console.log("Cliente conectado via WebSocket nativo");
  ws.send(JSON.stringify(getEstado()));

  ws.on("message", (data) => {
    let acao;

    try {
      acao = JSON.parse(data);
    } catch {
      return;
    }

    if (acao.tipo === "CHAMAR_PROXIMA") {
      const estadoAtualizado = chamarProxima();
      broadcast(estadoAtualizado);
    }
  });
}

module.exports = {
  getEstado,
  getHistorico,
  chamarProxima,
  handleWsConnection
};
