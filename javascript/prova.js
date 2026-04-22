/*  COPIE E COLE ESTE ENUNCIADO NO VSCODE! (arquivo .js)
Prova prática de recuperação do nivelamento (AV1) + prova (AV2).
Pode consultar o seu GitHub ou o do professor: https://github.com/profpatrickoli
Cópia de outros colegas ou uso de outros sites na internet (Google, IA, etc) = zero na recuperação! */

/* 1) (0,5 p) Crie variáveis para armazenar seu nome, altura, série e turma. Após isso, mostre no terminal uma mensagem personalizada se apresentando. */

/* 2) (0,5 p) Crie uma lista com 3 esportes que você gosta */

/* 3) (1,0 p) Crie uma condição que verifica se você é maior que o professor Patrick, que possui 1.73 de altura */

/* 4) (1,0 p) Crie uma função que mostre os 3 esportes no terminal. Use o laço de repetição que preferir. */

/* 5) (1,0 p) Crie um código que verifica se o esporte "natação" existe na lista criada da questão 2. */

/* 6) (1,0 p) Crie um laço de repetição que conta de 0 até -10 */

console.log('Atividade 1')
const nome = 'Richard';
const altura = 1.69;
const serie = '3° DS';
const turma = 'C';

console.log(`Olá, sou ${nome}! Tenho ${altura} metros de altura e estudo no ${serie} ${turma}!`);


console.log('Atividade 2')
const esportes = ['Tênis de mesa', 'Vôlei', 'Futebol'];
console.log(esportes)


console.log('Atividade 3')
if (altura > 1.73){
    console.log('Sua altura é maior que a do professor Patrick!')
} if (altura == 1.73) {
    console.log('Você e o professor Patrick têm a mesma altura!')
} else {
    console.log('Sua altura é menor que o professor Patrick!')
};


console.log('Atividade 4')
function mostrarEsportes(){
    esportes.forEach((esporte) => {console.log(esporte)})
};
mostrarEsportes();


console.log('Atividade 5')
if (esportes.find((esporte) => (esporte) == ('Natação'))) {
    console.log('Natação existe na lista esportes!')
} else {
    console.log('Natação não existe na lista esportes.')
};


console.log('Atividade 6')
let i = 0
while (i >= -10){
    console.log(i)
    i--
};