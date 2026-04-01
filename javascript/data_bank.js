/*
Exercício 2 (vale nota)
CRIAR UM "BANCO DE DADOS" DE ALGUMA DAS SEGUINTES CATEGORIAS:
LIVROS, FILMES, SÉRIES, JOGOS, ANIMES.
USANDO OBJETOS, COM PELO MENOS 10 ELEMENTOS.

SEGUIR O MODELO ABAIXO:
*/
const modelo = {
    titulo: "Título do Jogo",
    estudios: "Estúdios",
    ano: 9999,
    generos: 'Gênero 1, Gênero 2',
    plataformas: 'Microsoft Windows, Xbox 360',
    sinopse: "O ano é 2047. Uma enorme bola de fogo nuclear explode no céu noturno, marcando o início dramático da Terceira Guerra de Tiberium e o tão esperado retorno da franquia de estratégia em tempo real mais inovadora de todos os tempos.",
    preco: 32.99
}

const jogos = [
    {
        titulo: "Command and Conquer 3: Tiberium Wars",
        estudios: "Electronic Arts",
        ano: 2007,
        generos: 'RTS (Real Time Strategy), Ação, Estratégia, Sci-Fi',
        plataformas: 'Microsoft Windows, Xbox 360, macOS, Java Platform, Micro Edition, Mac OS Classic',
        sinopse: "O ano é 2047. Uma enorme bola de fogo nuclear explode no céu noturno, marcando o início dramático da Terceira Guerra de Tiberium e o tão esperado retorno da franquia de estratégia em tempo real mais inovadora de todos os tempos.",
        preco: 219.99
    },
    {
        titulo: "Ace Combat 7: Skies Unknown",
        estudios: "Bandai Namco Entertainment, Namco Bandai Games America Inc.",
        ano: 2019,
        generos: 'Ação de Voo Arcade, Simulador de Combate Aéreo, Ação, Realidade Virtual, Shooter',
        plataformas: 'PlayStation 4, Nintendo, Switch Xbox One, Microsoft Windows',
        sinopse: "Situado no mundo de Strangereal durante a 'Segunda Guerra Continental Useana' em 2019, a trama foca no piloto 'Trigger', acusado falsamente de assassinato e transferido para o esquadrão penal 'Spare', lutando na guerra entre a Federação de Osea e o Reino de Erusea.",
        preco: 149.99
    },
    {
        titulo: "Hi-Fi Rush",
        estudios: "Tango Gameworks",
        ano: 2023,
        generos: 'Plataforma, Aventura, Luta, Ação',
        plataformas: 'PlayStation 5, Xbox Cloud Gaming, Microsoft Windows, Xbox Series X e Series S',
        sinopse: "Chai, um aspirante a rockstar, tem seu reprodutor de música fundido ao coração após um experimento defeituoso. Marcado como 'defeito' por uma megacorporação, ele luta pela liberdade em um mundo onde tudo — plataforma, inimigos e ataques — se sincroniza ao ritmo da música",
        preco: 149.95
    },
    {
        titulo: "Título do Jogo",
        estudios: "Estúdios",
        ano: 9999,
        genero: 'Gênero 1, Gênero 2',
        plataformas: 'Microsoft Windows, Xbox 360',
        sinopse: "O ano é 2047. Uma enorme bola de fogo nuclear explode no céu noturno, marcando o início dramático da Terceira Guerra de Tiberium e o tão esperado retorno da franquia de estratégia em tempo real mais inovadora de todos os tempos.",
        preco: 32.99
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
                    jogo.estudios + "\nAno: " + 
                    jogo.ano + "\nGêneros: " +
                    jogo.generos + "\nPlataformas: " +
                    jogo.plataformas + "\nSinopse: "
                    + jogo.sinopse + "\nPreços: R$ " +
                    jogo.preco.toFixed(2).replaceAll(".",",") +
                    "\n------------")
    })
}
mostrarJogos(arquivo)

let jogosFiltrados = arquivo.filter((jogo) => jogo.preco < 100)
mostrarJogos(jogosFiltrados)

let jogosDesconto = arquivo.map((jogo) => {
    return {...jogo, preco: jogo.preco * 0.67}
})
mostrarJogos(jogosDesconto)