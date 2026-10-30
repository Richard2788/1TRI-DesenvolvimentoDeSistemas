async function carregar_carros(busca=false) {
    // Lógica para verificar se a pessoa já entrou no site através de um link com parâmetros
    if (busca==false) {
        const paramsDaUrl = new URLSearchParams(window.location.search);
        if (paramsDaUrl.toString() !== "") {
            if (paramsDaUrl.has("busca")) {
                document.getElementById("inp_pesquisar").value = paramsDaUrl.get("busca");
            }
            if (paramsDaUrl.has("ordenacao")) {
                document.getElementById("select-ordem").value = paramsDaUrl.get("ordenacao");
            }
        }
    }

    const params = new URLSearchParams();
    const valorBusca = document.getElementById("inp_pesquisar").value;
    const valorOrdem = document.getElementById("select-ordem").value;
    if (valorBusca.trim() !== "") {
        params.append("busca", valorBusca);
    }
    if (valorOrdem.trim() !== "") {
        params.append("ordenacao", valorOrdem);
    }

    const paramsString = params.toString();
    // preenche os parâmetros na URL do navegador
    window.history.pushState({}, "", paramsString ? `?${paramsString}` : window.location.pathname);


    try{
        // busca dos carros na API com parâmetros
        const carros =  await buscar_carros(params)

        // lógica para mostrar os carros no Front-End
        const container = document.getElementById("carros");
        container.replaceChildren();
        if (carros.length == 0){
            document.getElementById("carros").class = "";
            document.getElementById("carros").innerHTML = 
                '<p style="margin: 0; text-align: center;">❌ Não foi encontrado nenhum carro para essa busca!</p>';
        }
        container.className = "grid-carros"
        carros.forEach(carro => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${carro.caminho_img}" alt="${carro.nome}">
                <div class="nome-carro">${carro.nome}</div>
                <div class="info">
                    <div class="descricao">${carro.descricao.substring(0, 40)}...</div>
                    <div class="preco">R$ ${carro.preco.replace(".", ",")}</div>
                </div>
                <button class="btn_enviar" onclick="comprar(${carro.id})">Comprar</button>
                `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao carregar carros:", error);
        document.getElementById("carros").class = "";
        document.getElementById("carros").innerHTML = 
                '<p style="margin: 0; text-align: center;">❌ Não foi possível carregar os carros.</p>';
    }
}

window.addEventListener("DOMContentLoaded", carregar_carros)