// JSON: JavaScript Object Notation
// É una notação para traduzir objetos JavaScript em texto

const alunos = [
    {
        nome: 'Richard',
        dataNasc: '26/07/2009',
        turma: '3°DSC'
    },
    {
        nome: 'Pietro',
        dataNasc: '24/12/2009',
        turma: '3°DSC'
    },
    {
        nome: 'Guilherme',
        dataNasc: '09/06/2009',
        turma: '3°DSC'
    },
    {
        nome: 'Nycolas',
        dataNasc: '17/09/2008',
        turma: '3°DSC'
    }
]

const alunosJSON = JSON.stringify(alunos)
console.log("---------------\nprint OBJ\n")
console.log(alunos)
console.log("---------------\nprint nome do item número 0\n")
console.log(alunos[0].nome)
console.log("---------------\nprint JSON\n")
console.log(alunosJSON)

const alunosOBJ = JSON.parse(alunosJSON)
console.log("---------------\nJSON para OBJ\n")
console.log(alunosOBJ)

let notasPedro = [8.0, 4.5, 6.5, 9.0];
function calculaMedia(notas){
    media = (notas[0] + notas[1] + notas[2] + notas[3]) / 4
}
calculaMedia(notasPedro);
console.log(notasPedro.length)
console.log(media)


function criaArquivo(obj){
    const dadosJSON = JSON.stringify(obj)
    const fs = require('fs')
    fs.writeFileSync('alunos_1.json', dadosJSON)
}

criaArquivo(alunos);

// Lendo um arquivo JSON
const arquivo = require('./alunos_1.json')
console.log("---------------\nOBJ para JSON\n")
console.log(arquivo)