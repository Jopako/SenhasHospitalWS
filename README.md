# Implementação de Comunicação Bidirecional para Gestão de Filas em Ambientes hospitalares

Aplicação web para simulação de painel de senhas em clínica, com atualização em tempo real usando WebSocket.

## Techs

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socket.io&logoColor=white)

## Requisitos

- Node.js 18+ 
- npm

## Instalação

```bash
npm install
```

## Execução

Modo desenvolvimento (com recarga automática):

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

Servidor padrão:

- `http://localhost:3000`

## Rotas principais

- `/` -> tela inicial
- `/medico` -> painel para chamar próxima senha
- `/painel-senhas` -> painel de exibição de senha
- `/ws` -> monitor de conexão WebSocket
- `/estado` -> estado atual (JSON)
- `/historico` -> últimas senhas chamadas (JSON)

## Como testar rapidamente

1. Abra `http://localhost:3000/medico` em uma aba.
2. Abra `http://localhost:3000/painel-senhas` em outra aba.
3. Clique em **Chamar Próximo Paciente** no painel do médico.
4. Verifique a atualização instantânea no painel de senhas.

## Scripts npm

- `npm run dev` -> inicia com nodemon
- `npm start` -> inicia com node
- `npm test` -> placeholder padrão do projeto

## Diagrama de Fluxo (Arquitetura MVP)

```mermaid
flowchart TB
  VM["View (Medico)<br/>medico.html"]
  R["Rotas HTTP<br/>routes.js"]
  P["Presenter<br/>clinicaPresenter.js"]
  M["Model<br/>clinicaModel.js"]
  E["Estado Atualizado<br/>(senhaAtual, historico)"]
  W["WebSocket Server<br/>server.js"]
  VP["View (Painel/Monitor)<br/>painel-senhas.html / ws.html"]

  VM -->|"1. POST /medico"| R
  R -->|"2. chama Presenter"| P
  P -->|"3. chama Model"| M
  M -->|"4. retorna estado"| E
  E -->|"5. resposta JSON"| VM

  VP -->|"6. conecta WS"| W
  E -->|"7. broadcast"| W
  W -->|"8. push estado"| VP
```

### - Model (clinicaModel): 
guarda e manipula os dados da fila (senha atual e historico) em memoria. Ele não sabe nada de HTML, rotas ou WebSocket
### - View (app/views/*.html): 
representa as telas (médico, painel de senhas, monitor WS). Ela apenas exibe informaçoẽs e dispara açoẽs do usuário.
### - Presenter (clinicaPresenter): 
faz a ponte entre View e Model. Recebe eventos (HTTP/WS), chama regras do Model e devolve o estado atualizado para as views/clientes.

## Relatório Técnico

[![Download PDF](https://img.shields.io/badge/Download-PDF_Explicativo-red?style=for-the-badge&logo=adobe-acrobat-reader&logoColor=white)](./docs/Relatório.pdf)
