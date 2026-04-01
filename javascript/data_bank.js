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
        estudios: "EA Los Angeles / Electronic Arts",
        ano: 2007,
        generos: 'Estratégia em tempo real (RTS)',
        plataformas: 'PC, Xbox 360, Mac',
        sinopse: "Conflito global entre a Global Defense Initiative (GDI) e a Brotherhood of Nod em um mundo devastado pelo Tiberium, onde uma terceira facção alienígena (Scrin) invade a Terra em meio à guerra.",
        preco: 30.00
    },
    {
        titulo: "Ace Combat 7: Skies Unknown",
        estudios: "Bandai Namco Studios / Bandai Namco Entertainment.",
        ano: 2019,
        generos: 'Combate aéreo, Simulação arcade',
        plataformas: 'PS4 (jogável no PS5 via retrocompatibilidade), Xbox One (jogável no Series X|S), PC',
        sinopse: "Torne-se um ás dos ares e cruze céus fotorrealistas com movimentação completa em 360 graus; abata aeronaves inimigas e experimente a emoção de combates realistas.",
        preco: 339.90
    },
    {
        titulo: "Hi-Fi RUSH",
        estudios: "Tango Gameworks / Bethesda Softworks",
        ano: 2023,
        generos: 'Ação, Ritmo',
        plataformas: 'Xbox Series X|S, PC, PS5',
        sinopse: "Sinta a batida enquanto o aspirante a estrela Chai luta contra uma megacorporação maligna em um mundo onde tudo se sincroniza com a música.",
        preco: 149.95
    },
    {
        titulo: "Grounded 2",
        estudios: "Obsidian Entertainment / Eidos-Montréal / Xbox Game Studios",
        ano: 2025,
        generos: 'Sobrevivência, Aventura, Coop',
        plataformas: 'Xbox Series X|S, PC',
        sinopse: "Encolhido novamente, mas com um mundo muito maior. Sobreviva em um vasto mundo aberto, construa, explore e descubra mistérios enquanto enfrenta ameaças ocultas que observam você.",
        preco: 149.00
    },
    {
        titulo: "Shadow of the Colossus",
        estudios: "Japan Studio / Bluepoint Games / Sony Interactive Entertainment",
        ano: 2005,
        generos: 'Ação, Aventura',
        plataformas: 'PS2, PS3 (remaster), PS4 (remake)',
        sinopse: "Explore terras proibidas e enfrente colossos gigantescos em uma jornada épica para restaurar a vida de uma jovem, utilizando apenas sua espada, arco e inteligência.",
        preco: 99.50
    },
    {
        titulo: "Need for Speed Heat",
        estudios: "Ghost Games / Electronic Arts",
        ano: 2019,
        generos: 'Corrida, Mundo aberto',
        plataformas: 'PS4 (PS5 via retrocompatibilidade), Xbox One (Series X|S via retrocompatibilidade), PC',
        sinopse: "Trabalhe de dia e arrisque tudo à noite em Need for Speed Heat, um jogo de corrida onde você enfrenta a polícia enquanto constrói sua reputação nas ruas.",
        preco: 299.90
    },
    {
        titulo: "Tekken 6",
        estudios: "Bandai Namco Entertainment",
        ano: 2009,
        generos: 'Luta',
        plataformas: 'PS3, Xbox 360, PSP (versões posteriores adaptadas para PS4/PS5 e retrocompatibilidade Xbox)',
        sinopse: "Com uma enorme lista de personagens, ação rápida e estratégia aprofundada, Tekken 6 apresenta combates intensos, modos online e ampla customização de personagens.",
        preco: 59.00
    },
    {
        titulo: "Naruto Shippuden: Ultimate Ninja Storm 4",
        estudios: "CyberConnect2 / Bandai Namco Entertainment",
        ano: 2016,
        generos: 'Luta, Ação',
        plataformas: 'PS4 (PS5 via retro), Xbox One (Series via retro), Nintendo Switch, PC',
        sinopse: "Reviva a Quarta Grande Guerra Ninja em batalhas espetaculares com personagens icônicos, com combates rápidos, visuais em estilo anime e confrontos cinematográficos.",
        preco: 249.50
    },
    {
        titulo: "Sonic Frontiers",
        estudios: "Sonic Team / Sega",
        ano: 2022,
        generos: 'Ação, Aventura, Plataforma',
        plataformas: 'PS4 / PS5, Xbox One / Series, Nintendo Switch, PC',
        sinopse: "Corra livremente por vastas ilhas abertas enquanto Sonic busca as Esmeraldas do Caos e enfrenta inimigos poderosos em um novo estilo de aventura em mundo aberto.",
        preco: 299.90
    },
    {
        titulo: "Sonic Unleashed",
        estudios: "Sonic Team / Sega",
        ano: 2008,
        generos: 'Plataforma, Ação',
        plataformas: 'PS2, PS3, Xbox 360 (retrocompatível com Xbox Series), Wii',
        sinopse: "Sonic deve restaurar o mundo após ser fragmentado, alternando entre velocidade extrema durante o dia e combates mais pesados à noite em sua forma Werehog.",
        preco: 49.95
    }
]

function criarArquivo(dados){
    const jogosJSON = JSON.stringify(dados)
    const fs = require('fs');
    fs.writeFileSync("jogos.json", jogosJSON);
}
criarArquivo(jogos)

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
                    + jogo.sinopse + "\nPreço: R$ " +
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