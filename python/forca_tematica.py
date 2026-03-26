import random

numero = random.randint(0, 50)
letras_acertadas = []
item = []
arquivo = open("jojo1_1.txt", "r")
for linha in arquivo:
    item.append(linha.strip())

palavra = item[numero]
print(palavra)

for letra in palavra:
    if (letra != " "):
        letras_acertadas.append("_")
    else:
        letras_acertadas.append(" ")

acertou = False
enforcou = False
limite_tentativas = (len(palavra) + 6)
tentativa = 1
print(letras_acertadas)

def mostrar_letras_acertadas():
    for letra in letras_acertadas:
        print(letra, end = " ")


print("Tente adivinhar a palavra secreta: ")
while(not acertou and not enforcou):
    # Mostrar letras acertadas
    mostrar_letras_acertadas()

    print("")
    chute = input("Digite uma letra: ")
    i = 0
    for letra in palavra:
        if (chute.upper() == letra.upper()):
             letras_acertadas[i] = letra
        i = (i + 1)

    if (tentativa >= limite_tentativas):
        print("Você perdeu :/ \nA palavra era:", palavra)
        enforcou = True

    if (letras_acertadas.count("_") == 0):
        print(f"Parabéns, você encontrou a palavra secreta! A palavra é... {palavra}!")
        acertou = True
        
    tentativa = (tentativa + 1)



# TABELA VERDADE
# Quero fazer um suco de banana e maçã
# banana = True
# maca = True
#       E         |          OU
#  V  V  =  V     |      V  V  =  V
#  V  F  =  F     |      V  F  =  V
#  F  V  =  F     |      F  V  =  V
#  F  F  =  F     |      F  F  =  F
