// INFORMAÇÕES GERAIS //
/*
SUGESTÃO: Deixe a janela do seu terminal bem grande para visualizar melhor

Resolvi criar uma função menuConta() //lá embaixo junto com outras funções // onde faço todas as operações de uma conta.
Escolhi este método para ficar algo mais parecido com um menu de um aplicativo ou coisa do tipo. Porém, não consegui adaptar
essa ideia no menu principal, onde você acessa as opções separadamente, mas elas te levam ao mesmo menu, sinto que poderia ser melhor.


Toda vez que tivermos um método .toLowerCase() é onde tive de normalizar, para o cliente não se preocupar com formatações
Toda vez que tivermos um método .toFixed(2), são quando quero formatar moeda para mostrarmos no console

*/


//Imports
///Importando prompt para trabalhar com entradas
var prompt = require('prompt-sync')()

///Importando classes
const ContaCorrente = require('./classes/ContaCorrente')
const ContaPoupanca = require('./classes/ContaPoupanca')

let contas = []


let opt = 'n'

//MENU PRINCIPAL
while (opt != 's') {

    console.log('\n\nMENU PRINCIPAL\n\n1 - Criar Conta\n2 - Consultar Saldo\n3 - Depositar\n4 - Sacar\nS - Sair')
    opt = prompt('Digite sua opção: ').toLowerCase() //variável para lidar com as opções do menu principal

    //resolvi utilizar um switch/case + while porque foi o jeito mais fácil de lidar com entradas erradas ( voltando o loop ). 
    switch (opt) {
        case '1':
            let optCaseOne = '0'
            while (optCaseOne != 'v') {


                console.log('\n\n\n\nCRIAR CONTA\n\n1 - Criar Conta Corrente\n2 - Criar Conta Poupança\nV - Voltar')
                optCaseOne = prompt('Digite sua opção: ').toLowerCase()

                //Aqui dentro do case 1 ( Criar Conta ), teremos algumas opções, logo, um novo switch case. Coloquei o 'V' como forma de saída para diferenciar do menu principal
                // e também porque estamos retornando de um menu, e não saindo do sistema.
                switch (optCaseOne) {
                    case '1': // case 1 - Chama a função de criar conta corrente
                        criarContaCorrente()
                        break
                    case '2': // case 2 - Chama a função de criar conta poupança
                        criarContaPoupanca()
                        break
                    case 'v':
                        break
                    case 'V': //Voltar ao menu principal
                        break
                    default:
                        console.log('Opção inválida') // Para caso de entradas erradas
                }
            }
            break;

        /*
            Do case 2 ao case 4 teremos tudo muito parecido (aqui acho que caberia algo para diminuir a repetição de código)
            Como dito antes, direcionarei tudo ao mesmo menu, pois lá dentro lidarei direto com a conta selecionada
        */

        //Consultar saldo
        case '2':
            let optCaseTwo = '0'
            while (optCaseTwo != 'v') {

                console.log('\n\n\n\nCONSULTAR SALDO')
                console.log('\nCONTAS ATIVAS\n')
                // Esse IF aqui vai aparecer algumas vezes, ele é uma validação e forma de informar ao usuário que SE NÃO CRIAR CONTA NÃO TEM O QUE MOVIMENTAR
                //Dava pra elaborar legal e jogar o menu de criar conta dentro dele também
                if (contas.length < 1) {
                    console.log('Nenhuma conta encontrada! Crie uma conta para poder movimentar.')
                }

                //Mostrando as contas disponíveis
                for (let i = 0; i < contas.length; i++) {
                    console.log(`${i + 1} - ${contas[i].titular}`)
                }
                console.log('V - Voltar')
                optCaseTwo = prompt('Digite sua opção: ').toLowerCase() // Mesmo funcionamento do menu principal

                //Mais um IF de validação, para a opção ser válida, tem que estar dentro do array de contas 
                if (Number(optCaseTwo) > 0 && Number(optCaseTwo) <= contas.length) {
                    menuConta(Number(optCaseTwo) - 1)
                } else if (optCaseTwo != 'v') {
                    console.log('\nOpção inválida\n')
                }

            }
            break;

        case '3':

            let optCaseThree = '0'
            while (optCaseThree != 'v') {

                console.log('\n\n\n\nDEPOSITAR')
                console.log('\nCONTAS ATIVAS\n')

                if (contas.length < 1) {
                    console.log('Nenhuma conta encontrada! Crie uma conta para poder movimentar.')
                }
                for (let i = 0; i < contas.length; i++) {
                    console.log(`${i + 1} - ${contas[i].titular}`)
                }
                console.log('V - Voltar')
                optCaseThree = prompt('Digite sua opção: ').toLowerCase()

                if (Number(optCaseThree) > 0 && Number(optCaseThree) <= contas.length) {
                    menuConta(Number(optCaseThree) - 1)
                } else if (optCaseThree != 'v') {
                    console.log('\nOpção inválida\n')
                }
            }
            break;

        case '4':

            let optCaseFour = '0'
            while (optCaseFour != 'v') {

                console.log('\n\n\n\SACAR')
                console.log('\nCONTAS ATIVAS\n')
                if (contas.length < 1) {
                    console.log('Nenhuma conta encontrada! Crie uma conta para poder movimentar.')
                }
                for (let i = 0; i < contas.length; i++) {
                    console.log(`${i + 1} - ${contas[i].titular}`)
                }
                console.log('V - Voltar')
                optCaseFour = prompt('Digite sua opção: ').toLowerCase()

                if (Number(optCaseFour) > 0 && Number(optCaseFour) <= contas.length) {
                    menuConta(Number(optCaseFour) - 1)
                } else if (optCaseFour != 'v') {
                    console.log('\nOpção inválida\n')
                }
            }
            break;

        default:
            break;
    }

}

console.log('Operação Finalizada!')













//funções

/// Criar conta corrente
function criarContaCorrente() {

    let titular = prompt('Digite o nome do titular da conta: ')

    //Variáveis que utilizo para verificar se o saldo é válido
    let saldoValido = false
    let taxaValida = false

    //Utilizando um valor base para caso de pulo da entrada
    let saldo = 0
    let taxaJuros = 0

    while (!saldoValido) {
        saldo = Number(prompt('Digite o saldo inicial: '))

        // Como 0 é considerado um número inválido, tive que jogar essa verificação dupla aqui.
        if (!saldo && saldo != 0) {
            console.log('SALDO INVÁLIDO! Digite novamente')
        } else {
            saldoValido = true
        }
    }

    while (!taxaValida) {
        taxaJuros = Number(prompt('Digite o valor da taxa de juros: '))

        if (!taxaJuros && taxaJuros != 0) {
            console.log('VALOR INVÁLIDO! Digite novamente')
        } else {
            taxaValida = true
        }
    }

    //Chamando a classe ContaCOrrente
    let novoCliente = new ContaCorrente(titular, saldo, taxaJuros)

    //Jogando dentro do array de contas
    contas.push(novoCliente)
    //Mostrando o novo cliente
    console.log('____________________________\nCONTA CRIADA\n')
    console.log("Nome: " + novoCliente.titular)
    console.log(`Saldo inicial R$${novoCliente.saldo.toFixed(2)}`)
}

function criarContaPoupanca() {

    let titular = prompt('Digite o nome do titular da conta: ')
    let saldoValido, rendimentoValido = false
    let saldo = 0
    let rendimento = 0


    while (!saldoValido) {
        saldo = Number(prompt('Digite o saldo inicial: '))

        if (!saldo && saldo != 0) {
            console.log('SALDO INVÁLIDO! Digite novamente')
        } else {
            saldoValido = true
        }
    }

    while (!rendimentoValido) {
        rendimento = Number(prompt('Digite o valor de rendimento: '))

        if (!rendimento && rendimento != 0) {
            console.log('VALOR INVÁLIDO! Digite novamente')
        } else {
            rendimentoValido = true
        }
    }

    let novoCliente = new ContaPoupanca(titular, saldo, rendimento)

    contas.push(novoCliente)
    console.log('____________________________\nCONTA CRIADA\n')
    console.log("Nome: " + novoCliente.titular)
    console.log(`Saldo inicial R$${novoCliente.saldo.toFixed(2)}`)
}

//Aqui temos a função que cria aquele menu dos cases 2, 3 e 4
//Acessamos a conta através do índice dela dentro do array de contas
function menuConta(indiceConta) {
    let optConta = 0

    while (optConta != 's') {
        //Mostrando informações gerais da conta
        console.log('---------------------------')
        console.log('\nInformações da CONTA')
        console.log(`\nTitular: ${contas[indiceConta].titular}`)
        console.log(`Tipo de conta: ${contas[indiceConta].cc ? 'Conta Corrente' : 'Conta Poupança'}`)
        console.log(`Saldo: R$${contas[indiceConta].saldo.toFixed(2)}`)
        console.log(`${contas[indiceConta].cc ? 'Taxa de Juros: ' : 'Rendimento: '}: ${contas[indiceConta].cc ? contas[indiceConta].juros : contas[indiceConta].rendimento}%`)
        console.log('\n\nOPÇÕES')
        console.log('1 - Sacar')
        console.log('2 - Depositar')
        console.log(`3 - Aplicar ${contas[indiceConta].cc ? 'Taxa de Juros' : 'Rendimento'}`)
        console.log('S - Sair')

        optConta = prompt('Digite a opção desejada: ')
        let valor

        //Como estamos "dentro da conta" fica mais simples trabalhar.
        switch (optConta) {

            //No caso de saque, já chamamos o método feito dentro da classe
            case '1':
                valor = Number(prompt('Quanto deseja sacar? '))
                contas[indiceConta].sacar(valor)
                break

            //Mesmo caso do saque
            case '2':
                valor = Number(prompt('Quanto deseja depositar? '))
                contas[indiceConta].depositar(valor)
                break

            //Dentro da classe ContaCorrente, criquei um atributo cc, que ajuda a saber qual o tipo de conta
            //Utilizo esse if para saber qual método chamar, se a conta tiver um atributo cc, chamamos aplicarJuros(), se não, aplicarRendimento()
            case '3':
                if (contas[indiceConta].cc) {
                    contas[indiceConta].aplicarJuros()
                    console.log('---------------------------')
                    console.log(`\nJuros de ${contas[indiceConta].juros.toFixed(2)}% aplicado, saldo atual de R$${contas[indiceConta].saldo.toFixed(2)}`)
                } else {
                    contas[indiceConta].aplicarRendimento()
                    console.log(`\Rendimento de ${contas[indiceConta].rendimento.toFixed(2)}% aplicado, saldo atual de R$${contas[indiceConta].saldo.toFixed(2)}`)
                }
                break
            
            //Opção para voltar
            case 'V':
                break

            //Lidando com opções inválidas
            default:
                console.log('Opção inválida')
        }
    }

}