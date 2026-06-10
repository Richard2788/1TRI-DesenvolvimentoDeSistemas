import tkinter as tk
from telaGerente import abrir_tela2

def login():                # Função do comando 'login'
    if input_cpf.get() == "14821106957":
        if input_senha.get() == "rmb1931":
            label_res.configure(text= "Login realizado com sucesso!", fg="green")
            botao.gerente = tk.Button(app, text= 'Cadastrar', command= abrir_tela2(app))   # Cria um botão para enviar os dados da inseridos nas entradas de texto, text é texto do botão e command define reações ao usar o botão, neste caso chama a função 'login'
            botao.gerente.pack()
        else:
            label_res.configure(text= "Falha no login", fg="red")
    else:
        label_res.configure(text= "Falha no login", fg="red")

# Toplevel cria a nova janela conectada à janela principal
app = tk.Tk()
app.title("Tela Login")
app.geometry("480x360")


# TÍTULO
titulo = tk.Label(app, text= 'Login', font= {'Arial', 45, })
titulo.pack()

# CPF  
label_cpf = tk.Label(app, text= 'CPF:')     # Cria um label para o campo de titular
label_cpf.pack(pady= 5)    # Define o padding do label de titular
input_cpf = tk.Entry(app)     # Cria a entrada de texto do campo de titular
input_cpf.pack()  # .pack define as propriedades do campo de titular

# AGENCIA
label_senha = tk.Label(app, text= "Senha:")
label_senha.pack(pady= 5)
input_senha = tk.Entry(app)
input_senha.pack()

# RESPOSTA
label_res = tk.Label(app, text= '')
label_res.pack(pady= 5)

# BOTÃO
botao = tk.Button(app, text= 'Enviar', command= login)   # Cria um botão para enviar os dados da inseridos nas entradas de texto, text é texto do botão e command define reações ao usar o botão, neste caso chama a função 'login'
botao.pack()    # Define as propriedades do botão

botao_fechar = tk.Button(app, text="Fechar", command=app.destroy)
botao_fechar.pack()
app.mainloop()  # Executa a tela em laço