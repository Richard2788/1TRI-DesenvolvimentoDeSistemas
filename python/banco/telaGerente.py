import tkinter as tk    # Importa a biblioteca da tela (tkinter)
from conta import Conta # Importa a classe 'Conta' de conta.py
import json

#def cadastrar():
 #   conta = Conta(input_titular.get(), input_agencia.get(), input_cpf.get())
  #  print(conta.extrato())
   # print(conta.numero)

def cadastrar():
    conta = Conta(input_titular.get(), input_agencia.get(), input_cpf.get())

    # Abrir o clientes.json
    with open('clientes.json', 'r') as clientes_arq:
        clientes = json.load(clientes_arq)
    clientes.append({
        "titular": conta.titular,
        "agencia": conta.agencia,
        "numero": conta.numero,
        "cpf": conta.cpf,
        "saldo": conta.saldo,
        "senha": conta.senha,
        "chavepix": conta.chavepix
    })

    # Salvar o arquivo json atualizado
    with open('clientes.json', 'w') as clientes_escrita:
        json.dump(clientes, clientes_escrita, indent=4)

    # Dar a resposta na Tela Gerente
    label_res.configure(
        text= (f'Conta: {conta.numero} Titular: {conta.titular} cadastrado com sucesso!'),
        fg= 'green'
    )
def abrir_tela2(janela_pai):
    # Toplevel cria a nova janela conectada à janela principal
    nova_tela = tk.Toplevel(janela_pai)
    nova_tela.title("Segunda Tela")
    nova_tela.geometry("300x200")
    
    botao_fechar = tk.Button(nova_tela, text="Fechar", command=nova_tela.destroy)
    botao_fechar.pack()
    # CONFIGURAÇÕES DA TELA
    app = tk.Tk()   # Obtém a função principal da tela e guarda na variável 'app'
    app.title('Tela Gerente')     # Define o título da tela
    app.geometry('480x360')     # Define a escala da tela

    # TÍTULO
    titulo = tk.Label(app, text= 'Cadastro de clientes', font= {'Arial', 45, })
    titulo.pack()

    # TITULAR  
    label_titular = tk.Label(app, text= 'Titular:')     # Cria um label para o campo de titular
    label_titular.pack(pady= 5)    # Define o padding do label de titular
    input_titular = tk.Entry(app)     # Cria a entrada de texto do campo de titular
    input_titular.pack()  # .pack define as propriedades do campo de titular


    # AGENCIA
    label_agencia = tk.Label(app, text= "Agência:")
    label_agencia.pack(pady= 5)
    input_agencia = tk.Entry(app)
    input_agencia.pack()


    # CPF
    label_cpf = tk.Label(app, text= "CPF:")
    label_cpf.pack(pady= 5)
    input_cpf = tk.Entry(app)
    input_cpf.pack()


    # BOTÃO
    botao = tk.Button(app, text= 'Enviar', command= cadastrar)   # Cria um botão para enviar os dados da inseridos nas entradas de texto, text é texto do botão e command define reações ao usar o botão, neste caso chama a função 'login'
    botao.pack()    # Define as propriedades do botão


    # RESPOSTA
    label_res = tk.Label(app, text= '')
    label_res.pack(pady= 5)


    app.mainloop()  # Executa a tela em laço