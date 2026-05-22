import tkinter as tk    # Importa a biblioteca da tela (tkinter)

def login():                # Função do comando 'login'
    print('Login realizado')

def show_input():
    conteudo = entrada.get()
    print(f"Você digitou: {conteudo}")

app = tk.Tk()   # Obtém a função principal da tela e guarda na variável 'app'
app.title('Tela legal')     # Define o título da tela
app.geometry('400x300')     # Define a escala da tela

label_email = tk.Label(app, text= 'Email:')     # Cria um label para o campo de email
label_email.pack(pady=5)    # Define o padding do label de email

input_email = tk.Entry(app)     # Cria a entrada de texto do campo de email
input_email.pack()  # .pack define as propriedades do campo de email

text_email = tk.Entry(app, width=30)
text_email.pack(pady=20)

label_passw = tk.Label(app, text= 'Senha:')     # Cria um label para o campo de senha
label_passw.pack(pady=5)    # Define o padding do label de senha

input_passw = tk.Entry(app)     # Cria a entrada de texto do campo de senha
input_passw.pack()  # .pack define as propriedades do campo de senha

text_passw = tk.Entry(app, width=30)
text_passw.pack(pady=20)

botao = tk.Button(app, text= 'Enviar', command=show_input)   # Cria um botão para enviar os dados da inseridos nas entradas de texto, text é texto do botão e command define reações ao usar o botão, neste caso chama a função 'login'
botao.pack()    # Define as propriedades do botão



app.mainloop()  # Executa a tela em laço