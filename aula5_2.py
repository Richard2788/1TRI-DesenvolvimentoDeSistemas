# Importação de biblioteca
import random

# Configurações do jogo
tentativas = 1
errou = True
sorteio_max = 10
tentativas_max = 10
numero = random.randint(0,10)

while True:
    print("Dificuldade do jogo:")
    print("Fácil - Opção 1")
    print("Médio - Opção 2")
    print("Difícil - Opção 3")
    print("Sair - Opção 4")
    opcao = int(input("Digite a opção desejada (1 a 4): "))
    if opcao == 1:
        print("Selecionado opção 1")
        break
    elif opcao == 2:
        tentativas_max = 5
        print("Selecionado opção 2")
        break
    elif opcao == 3:
        tentativas_max = 3
        print("Selecionado opção 3")
        break
    elif opcao == 4:
        break
    else:
        print("Opção inválida, digite um número de 1 a 4")

if (opcao != 4):
    while (tentativas <= tentativas_max):
        print(f"Tentativa {tentativas}")
        chute = int(input("Digite o seu chute (0 a 10): "))
        if chute == numero:
            errou = False
            print("Parabéns, você é o bonzão mesmo!")
            break
        else:
            print("Errou :(")
            if (tentativas <= (tentativas_max - 1) and opcao != 3):
                if (chute > numero):
                    print(f"O número é menor que {chute}")
                else:
                    print(f"O número é maior que {chute}")
        tentativas = tentativas + 1
    if (errou == True):
        print(f"O número sorteado era {numero}")

print("### FIM DO JOGO ###")