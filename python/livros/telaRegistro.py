import tkinter as tk    # Importa a biblioteca da tela (tkinter)
from livros import Livro # Importa a classe 'Livro' de livros.py
import json

#def cadastrar():
 #   conta = Conta(input_titular.get(), input_agencia.get(), input_cpf.get())
  #  print(conta.extrato())
   # print(conta.numero)


def cadastrar():
    livro = Livro(input_titulo.get(), input_autor.get(), input_ano.get(), input_sinopse.get())
    # Abrir o clientes.json
    with open('livros.json', 'r') as livros_arq:
        livros = json.load(livros_arq)
    livros.append({
        "titulo": livro.titulo,
        "autor": livro.autor,
        "ano": livro.ano,
        "sinopse": livro.sinopse,
        "downloads": 0
    })
    # Salvar o arquivo json atualizado
    with open('livros.json', 'w') as livros_escrita:
        json.dump(livros, livros_escrita, indent=4)
    # Dar a resposta na Tela Gerente
    label_res.configure(
        text= (f'Livro: {livro.titulo} - Autor: {livro.autor} cadastrado com sucesso!'),
        fg= 'green'
    )

def get_downloads(self):
        (self.__downloads)

# Toplevel cria a nova janela conectada à janela principal
app = tk.Tk()
app.title("Tela Registro")
app.geometry("480x360")


# TÍTULO
titulo = tk.Label(app, text= 'Cadastro de livros', font= {'Arial', 45, })
titulo.pack()

# TITULAR  
label_titulo = tk.Label(app, text= 'Título:')     # Cria um label para o campo de título
label_titulo.pack(pady= 5)    # Define o padding do label de título
input_titulo = tk.Entry(app)     # Cria a entrada de texto do campo de título
input_titulo.pack()  # .pack define as propriedades do campo de título

# AGENCIA
label_autor = tk.Label(app, text= "Autor:")
label_autor.pack(pady= 5)
input_autor = tk.Entry(app)
input_autor.pack()

# CPF
label_ano = tk.Label(app, text= "Ano:")
label_ano.pack(pady= 5)
input_ano = tk.Entry(app)
input_ano.pack()

# SENHA
label_sinopse = tk.Label(app, text= "Sinopse:")
label_sinopse.pack(pady= 5)
input_sinopse = tk.Entry(app)
input_sinopse.pack()

# RESPOSTA
label_res = tk.Label(app, text= '')
label_res.pack(pady= 5)

# BOTÃO
botao_enviar = tk.Button(app, text= 'Enviar', command= cadastrar)   # Cria um botão para enviar os dados da inseridos nas entradas de texto, text é texto do botão e command define reações ao usar o botão, neste caso chama a função 'login'
botao_enviar.pack()    # Define as propriedades do botão
botao_catalogo = tk.Button(app, text="Catálogo", command= get_downloads)
botao_catalogo.pack()
botao_fechar = tk.Button(app, text="Fechar", command=app.destroy)
botao_fechar.pack()
app.mainloop()  # Executa a tela em laço
