/*
Exercício 2 (vale nota)
CRIAR UM "BANCO DE DADOS" DE ALGUMA DAS SEGUINTES CATEGORIAS:
LIVROS, FILMES, SÉRIES, JOGOS, ANIMES.
USANDO OBJETOS, COM PELO MENOS 10 ELEMENTOS.

SEGUIR O MODELO ABAIXO:
*/
const modelo = {
    titulo: "Título go Jogo",
    estudios: "Estúdios",
    ano: 9999,
    genero: ['Gênero 1', 'Gênero 2'],
    plataformas: ['Microsoft Windows', 'Xbox 360'],
    sinopse: "O ano é 2047. Uma enorme bola de fogo nuclear explode no céu noturno, marcando o início dramático da Terceira Guerra de Tiberium e o tão esperado retorno da franquia de estratégia em tempo real mais inovadora de todos os tempos.",
    preco: 32.99
}

const jogos = [
    {
        titulo: "Command and Conquer 3: Tiberium Wars",
        estudios: "Electronic Arts",
        ano: 2007,
        generos: ['RTS (Real Time Strategy)', 'Ação', 'Estratégia', 'Sci-Fi'],
        plataformas: ['Microsoft Windows', 'Xbox 360', 'macOS', 'Java Platform', 'Micro Edition', 'Mac OS Classic'],
        sinopse: "O ano é 2047. Uma enorme bola de fogo nuclear explode no céu noturno, marcando o início dramático da Terceira Guerra de Tiberium e o tão esperado retorno da franquia de estratégia em tempo real mais inovadora de todos os tempos.",
        precos: 20.33
    },
    {
        titulo: "Ace Combat 7: Skies Unknown",
        estudios: ["Bandai Namco Entertainment", "Namco Bandai Games America Inc."],
        ano: 2019,
        generos: ['Ação de Voo Arcade', 'Simulador de Combate Aéreo', 'Ação', 'Realidade Virtual', 'Shooter'],
        plataformas: ['PlayStation 4', 'Nintendo Switch', 'Xbox One', 'Microsoft Windows'],
        sinopse: "Situado no mundo de Strangereal durante a 'Segunda Guerra Continental Useana' em 2019, a trama foca no piloto 'Trigger', acusado falsamente de assassinato e transferido para o esquadrão penal 'Spare', lutando na guerra entre a Federação de Osea e o Reino de Erusea",
        precos: 32.99
    },
    {
        titulo: "Título go Jogo",
        estudios: "Estúdio",
        ano: 9999,
        generos: ['Gênero 1', 'Gênero 2'],
        plataformas: ['Microsoft Windows', 'Xbox 360'],
        sinopse: "O ano é 2047. Uma enorme bola de fogo nuclear explode no céu noturno, marcando o início dramático da Terceira Guerra de Tiberium e o tão esperado retorno da franquia de estratégia em tempo real mais inovadora de todos os tempos.",
        precos: 32.99
    },
    {
        titulo: "Título go Jogo",
        estudios: "Estúdio",
        ano: 9999,
        generos: ['Gênero 1', 'Gênero 2'],
        plataformas: ['Microsoft Windows', 'Xbox 360'],
        sinopse: "O ano é 2047. Uma enorme bola de fogo nuclear explode no céu noturno, marcando o início dramático da Terceira Guerra de Tiberium e o tão esperado retorno da franquia de estratégia em tempo real mais inovadora de todos os tempos.",
        precos: 32.99
    }
]

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

function mostrarJogos(lista){
    console.log("##### ESTOQUE DE JOGOS #####")
    lista.forEach((jogo) => {
        console.log(jogo.titulo + " - " + 
                    jogo.estudios + " Ano:" + 
                    jogo.ano + " Gêneros: " +
                    jogo.generos + "Plataformas: " +
                    jogo.plataformas + "Sinopse: "
                    + jogo.sinopse + " Preços: R$ "+
                    jogo.precos.toFixed(2).replaceAll(".",","))
    })
}
mostrarJogos(arquivo)

let jogosFiltrados = arquivo.filter((jogo) => jogo.preco > 100)
mostrarJogos(jogosFiltrados)

let jogosDesconto = arquivo.map((jogo) => {
    return {...jogo, preco: jogo.preco * 0.9}
})
mostrarJogos(jogosDesconto)