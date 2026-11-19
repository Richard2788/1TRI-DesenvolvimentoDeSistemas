function atualizar_navbar() {
    const nome = localStorage.getItem('nome_cliente')
    const token = localStorage.getItem('token')

    const nav_unknown = document.getElementsByClassName("nav-item unknown")
    const btn_user_info = document.getElementsByClassName("nav-item dropdown")
    const btn_user_name = document.getElementsByClassName("nav-link dropdown-toggle")

    if (token && nome) {
        if (nav_unknown[0]) nav_unknown[0].style.display = "none"
        if (btn_user_info[0]) btn_user_info[0].style.display = "inline"
        if (btn_user_name[0]) btn_user_name[0].innerText = "Olá, " + nome.split(" ")[0]
    } else {
        if (nav_unknown[0]) nav_unknown[0].style.display = "inline"
        if (btn_user_info[0]) btn_user_info[0].style.display = "none"

    }
}

function perfil() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Você precisa estar logado para acessar o perfil.");
        window.location.href = "login.html";
    } else {
        window.location.href = "perfil.html";
    }
}

function logout() {
    localStorage.removeItem("nome_cliente")
    localStorage.removeItem("token")
    window.location.href = "login.html"
}

window.addEventListener("DOMContentLoaded", atualizar_navbar)

// Carrinho persistido no navegador. O servidor valida IDs e preços ao finalizar.
function obterCarrinho() {
    try {
        const itens = JSON.parse(localStorage.getItem("carrinho_compras") || "[]");
        return Array.isArray(itens) ? itens : [];
    } catch {
        return [];
    }
}

function adicionarAoCarrinho(carro) {
    const carrinho = obterCarrinho();
    if (carrinho.some(item => Number(item.idCarro) === Number(carro.id))) {
        alert("Este veículo já está no carrinho.");
        return;
    }
    carrinho.push({
        idCarro: Number(carro.id),
        nome: String(carro.nome || ""),
        preco: Number(carro.preco),
        imagem: String(carro.imagem || "")
    });
    localStorage.setItem("carrinho_compras", JSON.stringify(carrinho));
    alert("Veículo adicionado ao carrinho!");
}

function abrirCarrinho() {
    window.location.href = "carrinho.html";
}
