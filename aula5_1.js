// Listas
// Índice: sempre começa em 0

let esportes = [
    {
        nome: "Futsal",
        taxaInscricao: 12
    },
    {
        nome: "Vôlei",
        taxaInscricao: 15
    },
    {
        nome: "Tênis de mesa",
        taxaInscricao: 5
    }
]

esportes.forEach((esporte) => {
    console.log(esporte.nome + " - R$ " + esporte.taxaInscricao)
})