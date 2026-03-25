/* A escola adota uma recuperação para cada avaliação, 
que substitui a nota do aluno caso seja maior que 
sua nota anterior.
Dada as seguintes notas, calcule a média simples 
do aluno e diga se ele está aprovado ou reprovado, 
levando em consideração a substituição de notas. */

const av1 = 1.0;
const av2 = 5.0;
const recup1 = 10.0;
const recup2 = 5.0;
let nota1;
let nota2;
let media;

if (recup1 > av1) {
    console.log("True")
    nota1 = recup1
    console.log("Sua primeira recuperação resultou em " + nota1 + " pontos")
} else {
    console.log("False")
    nota1 = av1
    console.log("Sua primeira avaliação resultou em " + nota1 + " pontos")
}

if (recup2 > av2) {
    console.log("True")
    nota2 = recup2
    console.log("Sua segunda recuperação resultou em " + nota2 + " pontos")
} else {
    console.log("False")
    nota2 = av2
    console.log("Sua segunda avaliação resultou em " + nota2 + " pontos")
}

media = (nota1 + nota2) / 2
console.log("A média é " + media)

if (media < 6) {
    console.log("Sinto muito, você está reprovado. Faltou " + (10 - media) + " pontos para a aprovação.")
} else {
    console.log("Parabéns! Você foi aprovado!")
}
