import 'data_bank.js'
function criarArquivo(dados){
    const jogosJSON = JSON.stringify(dados)
    const fs = require('fs');
    fs.writeFileSync("jogos.json", jogosJSON);
}
criarArquivo(jogos)
//criarArquivo(jogos)
let arquivo
function lerArquivo(){
    arquivo = require("./jogos.json")
    console.log(arquivo)
}
lerArquivo()

