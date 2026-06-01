import tkinter as tk

def login():                # Função do comando 'login'
    if input_titular.get() == "meu nome é douglas":
        if input_agencia.get() == "1034":
            if input_cpf.get() == "14821106957":
                label_res.configure(text= "Login realizado com sucesso!", fg="green")
                botao.gerente = tk.Button(app, text= 'Cadastrar', command= cadastrar)   # Cria um botão para enviar os dados da inseridos nas entradas de texto, text é texto do botão e command define reações ao usar o botão, neste caso chama a função 'login'
                botao.gerente.pack()
            else:
                label_res.configure(text= "Falha no login", fg="red")
        else:
            label_res.configure(text= "Falha no login", fg="red")
    else:
        label_res.configure(text= "Falha no login", fg="red")