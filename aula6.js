// Funções
function calcularMedia (nota1, nota2){
    let media = (nota1 + nota2) / 2
    return ("A média é " + media)
}
console.log(calcularMedia(10, 4))

const furia = ["falleN", "molodoy", "KSCERATO", "yuurih", "YEKINDAR"]
function mostrarTime(){
    let indice = 0 // variável de início
    while(indice < furia.length){ // condição de parada
        console.log(furia[indice])
        indice++ // controle do laço
    }
}
mostrarTime()