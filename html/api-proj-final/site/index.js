//import {buscar_carros} from './api'

async function carregar_carros() {
    let carros
    try {
        // lógica com if para abrodar os casos onde têm:
        // sem/busca/ordenacao, com ordenacao, com busca, com ambos

        carros = await buscar_carros()
        alert(JSON.stringify(carros))
    } catch (error) {
        alert(error)
    }
}