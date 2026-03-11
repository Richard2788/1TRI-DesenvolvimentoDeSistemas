# Importação de biblioteca
import random

# Configurações do jogo
tentativas = 1
errou = True
sorteio_max = 10
tentativas_max = 10
numero = random.randint(0,10)

while (tentativas <= tentativas_max):
    print(f"Tentativa {tentativas}")
    chute = int(input("Digite o seu chute (0 a 10): "))
    if chute == numero:
        errou = False
        print("Parabéns, você é o bonzão mesmo!")
        break
    else:
        print("Errou :(")
        if (tentativas <= (tentativas_max - 1)):
            if (chute > numero):
                print(f"O número é menor que {chute}")
            else:
                print(f"O número é maior que {chute}")
    tentativas = tentativas + 1

if (errou == True):
    print(f"O número sorteado era {numero}")
print("### FIM DO JOGO ###")