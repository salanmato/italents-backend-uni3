class Conta {
    constructor(titular, saldo) {
        this.titular = titular
        this.saldo = saldo
    }

    sacar(valor) {
        if (!valor) {
            console.error('Digite um valor válido!')
        } else {
            if (valor <= this.saldo) {
                this.saldo = this.saldo - valor
            } else {
                console.log('Não foi possível realizar o saque, valor desejado maior do que em conta!')
            }
        }
    }

    depositar(valor) {
        if (!valor) {
            console.error('Digite um valor válido!')
        } else {
            this.saldo += valor
            console.log(`Depósito de: R$${valor.toFixed(2)}\nSaldo em conta: R$${this.saldo.toFixed(2)}`)
        }
    }
}

module.exports = Conta