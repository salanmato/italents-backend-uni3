const Conta = require("./Conta");

class ContaPoupanca extends Conta{
    constructor(titular, saldo, rendimento){
        super(titular, saldo)
        this.rendimento = rendimento
    }


    //métodos
    aplicarRendimento(){
        this.saldo = this.saldo + (this.saldo / 100 * this.rendimento)
    }
}

module.exports = ContaPoupanca