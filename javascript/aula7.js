// OBJETOS
let produtos = [
    {
        nome: "Leite",
        valor: 5,
        peso: "1L",
        codBarras: 112301000321,
        infNutricionais: "Sódio: 121, Kcal: 21313..."
    },
    {
        nome: "X-Lagartixa",
        valor: 20,
        peso: "500g",
        codBarras: 112301000322,
        infNutricionais: "Sódio: 2000, Kcal: 10001313..."
    }
]
indice = 0 // VARIÁVEL DE INÍCIO
while (indice < produtos.length){ // CONDIÇÃO DE PARADA
    console.log(produtos[indice].nome + " - R$ " + produtos[indice].valor)
    indice++ // SOMA NA VARIÁVEL
}

// FOR
console.log("Imprimindo com FOR:")
for(let i = 0; i < produtos.length; i++){
    console.log(produtos[i].nome + " - R$ " + produtos[i].valor)
}

// array.forEach() => lista.paraCada()
console.log("Imprimindo com forEach()")
produtos.forEach((produto) => {
    console.log(produto.nome + " - R$ " + produto.valor)
})


