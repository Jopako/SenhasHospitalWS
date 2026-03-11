const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const createRoutes = require('./app/routes/routes');
const clinicaPresenter = require('./app/presenters/clinicaPresenter');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Função para enviar para TODOS os clientes (Broadcast)
function broadcast(dados) {
    const mensagem = JSON.stringify(dados);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(mensagem);
        }
    });
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(createRoutes(clinicaPresenter, broadcast));

wss.on('connection', (ws) => {
    clinicaPresenter.handleWsConnection(ws, broadcast);
});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
