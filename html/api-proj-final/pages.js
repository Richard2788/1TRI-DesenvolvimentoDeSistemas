function atualizar_navbar() {
    const nome = localStorage.getItem('nome_cliente')
    const token = localStorage.getItem('token')

    const nav_unknown = document.getElementsByClassName("nav-item unknown")
    const btn_user_info = document.getElementsByClassName("nav-item dropdown")

    if (token && nome) {
        nav_unknown[0].style.display = "none"
        btn_user_info[0].style.display = "inline"
        //btn_user_info[0].innerText = "Olá, " + nome.split(" ")[0]
    } else {
        nav_unknown[0].style.display = "inline"
        btn_user_info[0].style.display = "none"

    }
}

function logout() {
    localStorage.removeItem("nome_cliente")
    localStorage.removeItem("token")
    window.location.href("login.html")
}

window.addEventListener("DOMContentLoaded", atualizar_navbar)