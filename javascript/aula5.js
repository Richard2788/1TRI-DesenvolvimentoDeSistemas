// Listas
// Índice: sempre começa em 0
//                    0           1           2      
const esportes = ["Futsal", "Vôlei", "Tẽnis de mesa"]
const taxaInscricao = [    12     ,     15   ,      5    ]     
let contador = 0 // variável de início
while(contador < esportes.length){ // condição de parada
    console.log(esportes[contador] + " - R$ " + taxaInscricao[contador])
    contador = contador + 1 // controle do laço
}

// Adicionar no final
esportes.push("xadrez")
taxaInscricao.push(20)
console.log(esportes)

// Remover no final
esportes.pop()
console.log(esportes)

// Remover um item específico ou adicionar
esportes.splice(2, 1) // remove a partir do índice 2, 1 elemento só
console.log(esportes)
esportes.splice(2, 2) // remove a partir do 2, 2 elementos
console.log(esportes)
esportes.splice(0, 1, "Queimada") // remove o indice 0 e adiciona um novo
console.log(esportes)
