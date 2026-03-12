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

// lista de produtos
const estoque = ["Sonic Unleashed", "Sonic Colors", "Sonic Frontiers", "Sonic 2006", "Sonic Forces",
                 "Sonic 1", "Sonic 2", "Sonic 3 & Knuckles"]

// lista de preços
const preco = [     "R$ 64,00",      "R$ 143,00",     "R$ 275,00",      "R$ 30,00",   "R$ 120,00",
                 "R$ 7,99", "R$ 7,99",      "R$ 9,99"]
                 
function mostrarCatalogo(){ // mostra os produtos e seus preços
    let contador = 0 // variável de início
    while(contador < estoque.length){ // condição de parada
        console.log(`${estoque[contador]}: ${preco[contador]}`) // exibição do item
        contador++ // controle do laço
    }
    console.log("## FIM DA LISTA ##")
}

function addProduto(addProduto, addPreco){ // adiciona um item ao final da lista
    estoque.push(addProduto) // adiciona produto
    preco.push(addPreco) // adiciona preço
    console.log(`Você adicionou ${addProduto}, com o preço de ${addPreco}!`)
}

function delProduto(delProdutoPos, contProduto){ // exclui um ou mais itens dependendo da posição solicitada
    estoque.splice(delProdutoPos, contProduto) // exclui produtos através da posição
    preco.splice(delProdutoPos, contProduto) // exclui preços através da posição
}

// Execução
mostrarCatalogo()
addProduto("Sonic 3D Blast", "R$ " + "12,00")
mostrarCatalogo()
delProduto(4, 1)
mostrarCatalogo()
