// define / atualiza todos os campos a partir dos parâmetros da URL do navegador
function preencher_camros_da_url(paramsDaUrl) {
    if (paramsDaUrl.has("busca")) {
        document.getElementById("inp_pesquisar").value = paramsDaUrl.get("busca");
    } else {
        document.getElementById("inp_pesquisar").value = "";
    }
    if (paramsDaUrl.has("ordenacao")) {
        document.getElementById("select-ordem").value = paramsDaUrl.get("ordenacao");
    } else {
        document.getElementById("select-ordem").value = "";
    }
    if (paramsDaUrl.has("categoria")) {
        document.getElementById("select-categoria").value = paramsDaUrl.get("categoria");
    } else {
        document.getElementById("select-categoria").value = "";
    }
    if (paramsDaUrl.has("preco_min")) {
        document.getElementById("inp_preco_min").value = paramsDaUrl.get("preco_min");
    } else {
        document.getElementById("inp_preco_min").value = "";
    }
    if (paramsDaUrl.has("preco_max")) {
        document.getElementById("inp_preco_max").value = paramsDaUrl.get("preco_max");
    } else {
        document.getElementById("inp_preco_max").value = "";
    }
}

async function carregar_carros(modo) {
    // Modos:
    //  'inicial' -> 1º carregamento da página: lê os filtros dos parâmetros da URL
    //  'busca'   -> novo clique em Buscar: usa os valores atuais dos campos
    //  'pagina'  -> mudança de página: usa os valores atuais dos campos
    const paramsDaUrl = new URLSearchParams(window.location.search);
    if (modo === 'inicial') {
        preencher_camros_da_url(paramsDaUrl);
    }

    const params = new URLSearchParams();
    const valorBusca = document.getElementById("inp_pesquisar").value;
    const valorOrdem = document.getElementById("select-ordem").value;
    const valorCategoria = document.getElementById("select-categoria").value;
    const valorPrecoMin = document.getElementById("inp_preco_min").value;
    const valorPrecoMax = document.getElementById("inp_preco_max").value;
    if (valorBusca.trim() !== "") {
        params.append("busca", valorBusca);
    }
    if (valorOrdem.trim() !== "") {
        params.append("ordenacao", valorOrdem);
    }
    if (valorCategoria.trim() !== "") {
        params.append("categoria", valorCategoria);
    }
    if (valorPrecoMin.trim() !== "") {
        params.append("preco_min", valorPrecoMin);
    }
    if (valorPrecoMax.trim() !== "") {
        params.append("preco_max", valorPrecoMax);
    }
    // a página é lida da própria URL (mudança de página/voltar não reseta os filtros)
    if (paramsDaUrl.has("pagina") && (modo !== 'busca')) {
        params.append("pagina", paramsDaUrl.get("pagina"));
    }

    const paramsString = params.toString();
    atualizar_url(paramsString ? `?${paramsString}` : window.location.pathname);

    try{
        // busca dos carros na API com parâmetros
        const resposta = await buscar_carros(params)
        const carros = resposta.carros;

        // lógica para mostrar os carros no Front-End
        const container = document.getElementById("carros");
        container.replaceChildren();
        container.className = "grid-carros"
        if (carros.length == 0) {
            container.className = "";
            container.innerHTML =
                '<p style="margin: 0; text-align: center;">❌ Não foi encontrado nenhum carro para essa busca!</p>';
        }
        carros.forEach(carro => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${carro.imagem}" alt="${carro.nome}">
                <div class="nome-carro">${carro.nome}</div>
                <div class="info">
                    <div class="descricao">${carro.descricao}</div>
                    <div class="preco">R$ ${carro.preco.replace(".", ",")}</div>
                </div>
                <button class="btn_enviar" onclick="comprar(${carro.id})">Comprar</button>
                `;

            container.appendChild(card);
        });

        // controle de paginação
        const paginacao = document.getElementById("paginacao");
        paginacao.replaceChildren();
        const totalPaginas = resposta.totalPaginas;
        const paginaAtual = resposta.pagina;

        const btn_anterior = document.createElement("button");
        btn_anterior.type = "button";
        btn_anterior.className = "btn_enviar";
        btn_anterior.innerText = "← Anterior";
        btn_anterior.disabled = paginaAtual <= 1;
        btn_anterior.onclick = () => mudar_pagina(paginaAtual - 1);

        const btn_proxima = document.createElement("button");
        btn_proxima.type = "button";
        btn_proxima.className = "btn_enviar";
        btn_proxima.innerText = "Próxima →";
        btn_proxima.disabled = paginaAtual >= totalPaginas;
        btn_proxima.onclick = () => mudar_pagina(paginaAtual + 1);

        const label_pagina = document.createElement("span");
        label_pagina.style.margin = "0 10px";
        label_pagina.innerText = `Página ${paginaAtual} de ${totalPaginas}`;

        if (totalPaginas > 1) {
            paginacao.appendChild(btn_anterior);
            paginacao.appendChild(label_pagina);
            paginacao.appendChild(btn_proxima);
        }

    } catch (error) {
        console.error("Erro ao carregar carros:", error);
        const container = document.getElementById("carros");
        container.className = "";
        container.innerHTML =
                '<p style="margin: 0; text-align: center;">❌ Não foi possível carregar os carros.</p>';
    }
}

function mudar_pagina(numero) {
    const params = new URLSearchParams(window.location.search);
    params.set("pagina", numero);
    atualizar_url(`?${params.toString()}`);
    carregar_carros(false);
}

// preenche os parâmetros na URL do navegador
// (ignora SecurityError quando o site é aberto direto pelo arquivo, file://)
function atualizar_url(nova) {
    try {
        window.history.pushState({}, "", nova);
    } catch (error) {
        console.warn("Não foi possível atualizar a URL (aberto via file://):", error)
    }
}

// impede que o submit do form recarregue a página e perca o resultado da busca
window.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#busca-produtos form");
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        carregar_carros('busca');
    });

    carregar_carros('inicial');
})

// voltar/avançar do navegador re-carrega os carros com os parâmetros da URL
window.addEventListener("popstate", () => carregar_carros(false))
