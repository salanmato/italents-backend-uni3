const Conta = require("./Conta");

class ContaCorrente extends Conta{
    constructor(titular, saldo, juros){
        super(titular, saldo)
        this.juros = juros
        this.cc = true
    }


    //métodos
    aplicarJuros(){
        this.saldo = this.saldo + (this.saldo / 100 * this.juros)
    }

}

module.exports = ContaCorrente