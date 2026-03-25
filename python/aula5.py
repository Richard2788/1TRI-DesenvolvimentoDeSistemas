# Importação de biblioteca
import random

# Sorteio do número aleatório
numero = random.randint(0, 10)

# TESTE
print(numero)

tentativas = 1
while (tentativas <= 3):
    print(f"Tentativa {tentativas}")
    chute = int(input("Digite o seu chute (0 a 10): "))
    if chute == numero:
        print("Parabéns, você é o bonzão mesmo!")
        break
    else:
        print("Errou :(")
        if (chute > numero):
            print(f"O número é menor que {chute}")
        else:
            print(f"O número é maior que {chute}")
    tentativas = tentativas + 1
print(f"O número sorteado era {numero}")
print("### FIM DO JOGO ###")
