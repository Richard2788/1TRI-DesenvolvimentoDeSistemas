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
console.log(alunos)
console.log(alunos[0].nome)
console.log(alunosJSON)

const alunosOBJ = JSON.parse(alunosJSON)
console.log(alunosOBJ)

let notasPedro = [8.0, 4.5, 6.5, 9.0];
function calculaMedia(notas){
    media = (notasPedro[0] + notasPedro[1] + notasPedro[2] + notasPedro[3]) / notasPedro.length
}
calculaMedia(notasPedro);
console.log(notasPedro.length)
console.log(media)


function criaArquivo(obj){
    const dadosJSON = JSON.stringify(obj)
    const fs = require('fs')
    fs.writeFileSync('alunos.json', dadosJSON)
}

criaArquivo(alunos);

// Lendo um arquivo JSON
const arquivo = require('./alunos.json')
console.log(arquivo)
