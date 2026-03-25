/*
Imagine que você abriu uma loja:
1) Crie o nome de 8 produtos e armazene em uma lista;
2) Crie outra lista para armazenar o preço de cada produto.
3) Crie uma função para mostrar o estoque, mostrando o nome da cada produto e o seu preço.
4) Crie uma função que adiciona um novo produto (e consequentemente um novo preço)
5) Crie uma função que remove um produto da lista recebendo seu índice.
6) EXECUTE AS FUNÇÕES CRIADAS NA SEGUINTE ORDEM:
    - mostra estoque
    - adiciona produto
    - mostra estoque
    - remove um elemento pelo índice
    - mostra estoque
*/


const estoque = ["Sonic Unleashed", "Sonic Colors", "Sonic Frontiers", "Sonic 2006", "Sonic Forces",
                 "Sonic 1", "Sonic 2", "Sonic 3 & Knuckles"]
const preco = [     "R$ 64,00",      "R$ 143,00",     "R$ 275,00",      "R$ 30,00",   "R$ 120,00",
                 "R$ 7,99", "R$ 7,99",      "R$ 9,99"]
function mostrarCatalogo(){
    let contador = 0 // variável de início
    while(contador < estoque.length){ // condição de parada
        console.log(`${estoque[contador]}: ${preco[contador]}`)
        contador++ // controle do laço
    }
}
mostrarCatalogo()

