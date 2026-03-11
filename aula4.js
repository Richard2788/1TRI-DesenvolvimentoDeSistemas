// Condições
// Se . . . senão
// if . . . else

const idade = 20
if (idade < 18) {
    console.log("Você não pode tirar a CNH")
} else {
    console.log("Você pode tirar CNH, pague a taxa!")
}

const possuiCHN = false
if (idade >= 18 && possuiCHN == true) {
    console.log("Tudo certo, você pode dirigir!")
}
// Operadores lógicos:
// && -> E
// || -> OU
/* TABELA VERDADE:
  Para operador E:     |    Para operador OU:
  V  V = V             |    V  V = V
  V  F = F             |    V  F = V
  F  V = F             |    F  V = V
  F  F = F             |    F  F = F
*/ 