import tkinter as tk    # Importa a biblioteca da tela (tkinter)
from conta import Conta # Importa a classe 'Conta' de conta.py
import json

#def cadastrar():
 #   conta = Conta(input_titular.get(), input_agencia.get(), input_cpf.get())
  #  print(conta.extrato())
   # print(conta.numero)

    
def abrir_tela2(janela_pai):
    def cadastrar():
        conta = Conta(input_titular.get(), input_agencia.get(), input_cpf.get(), input_senha.get())

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

    # Toplevel cria a nova janela conectada à janela principal
    janela_pai = tk.Toplevel(janela_pai)
    janela_pai.title("Tela Gerente")
    janela_pai.geometry("480x360")
    
    
    # TÍTULO
    titulo = tk.Label(janela_pai, text= 'Cadastro de clientes', font= {'Arial', 45, })
    titulo.pack()

    # TITULAR  
    label_titular = tk.Label(janela_pai, text= 'Titular:')     # Cria um label para o campo de titular
    label_titular.pack(pady= 5)    # Define o padding do label de titular
    input_titular = tk.Entry(janela_pai)     # Cria a entrada de texto do campo de titular
    input_titular.pack()  # .pack define as propriedades do campo de titular

    # AGENCIA
    label_agencia = tk.Label(janela_pai, text= "Agência:")
    label_agencia.pack(pady= 5)
    input_agencia = tk.Entry(janela_pai)
    input_agencia.pack()


    # CPF
    label_cpf = tk.Label(janela_pai, text= "CPF:")
    label_cpf.pack(pady= 5)
    input_cpf = tk.Entry(janela_pai)
    input_cpf.pack()

    # SENHA
    label_senha = tk.Label(janela_pai, text= "Senha:")
    label_senha.pack(pady= 5)
    input_senha = tk.Entry(janela_pai)
    input_senha.pack()

    # RESPOSTA
    label_res = tk.Label(janela_pai, text= '')
    label_res.pack(pady= 5)

    # BOTÃO
    botao_enviar = tk.Button(janela_pai, text= 'Enviar', command= cadastrar)   # Cria um botão para enviar os dados da inseridos nas entradas de texto, text é texto do botão e command define reações ao usar o botão, neste caso chama a função 'login'
    botao_enviar.pack()    # Define as propriedades do botão

    botao_fechar = tk.Button(janela_pai, text="Fechar", command=janela_pai.destroy)
    botao_fechar.pack()


    janela_pai.mainloop()  # Executa a tela em laço