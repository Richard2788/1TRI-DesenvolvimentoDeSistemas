// A API é servida junto com o site, na mesma porta (API_PORT do .env).
// Se a página estiver aberta via http(s), usa a própria origem da página;
// se for aberto direto pelo arquivo (file://), cai no fallback do config.js gerado.
let link_api =
    (typeof window !== "undefined" && window.location.protocol.startsWith("http"))
        ? window.location.origin
        : ((typeof window !== "undefined" && window.link_api) || "http://localhost:3002");

async function buscar_carros(queryParams) {
    let rota = "/carros"
    const queryString = queryParams.toString();
    if (queryString){
        rota+= "?" + queryString
    }
    const resposta = await fetch(link_api + rota);
    
    if (!resposta.ok) {
        throw new Error("Erro ao buscar carros");
    }

    const resposta_json = await resposta.json();
    return resposta_json;
}