class ClinicaModel {
  constructor() {
    this.senhaAtual = 0;
    this.historico = [];
  }

  getEstado() {
    return {
      senhaAtual: this.senhaAtual,
    };
  }

  getHistorico(){
    return {
      historico:this.historico,
    }
  }

  chamarProxima() {
    this.senhaAtual += 1;
    this.historico.unshift(this.senhaAtual);

    if (this.historico.length > 5) {
      this.historico.pop();
    }

    return this.getEstado();
  }
}

module.exports = new ClinicaModel();
