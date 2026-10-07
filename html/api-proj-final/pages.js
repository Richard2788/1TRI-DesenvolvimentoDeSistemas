function atualizar_navbar() {
    const nome = localStorage.getItem('nome_cliente')
    const token = localStorage.getItem('token')

    const nav_unknown = document.getElementsByClassName("nav-item unknown")
    const btn_user_info = document.getElementsByClassName("nav-item dropdown")
    const btn_user_name = document.getElementsByClassName("nav-link dropdown-toggle")

    if (token && nome) {
        nav_unknown[0].style.display = "none"
        btn_user_info[0].style.display = "inline"
        btn_user_name[0].innerText = "Olá, " + nome.split(" ")[0]
    } else {
        nav_unknown[0].style.display = "inline"
        btn_user_info[0].style.display = "none"

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