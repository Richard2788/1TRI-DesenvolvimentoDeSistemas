let link_api = 'http://localhost:3000'

async function buscar_carros(busca = '', ordenacao = '') {
    const resposta = await (fetch(link_api + '/carros'))
    const resposta_json = await resposta.json()
    if(!resposta){
        throw new Error('Erro ao buscar carros')
    }
    return resposta_json
}