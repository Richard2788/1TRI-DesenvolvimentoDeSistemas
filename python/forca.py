palavra = "KENNEDY"
acertou = False
letras_acertadas = ["_","_","_","_","_","_","_"]
print(letras_acertadas)

def mostrar_letras_acertadas():
    for letra in letras_acertadas:
        print(letra, end = " ")


print("Tente adivinhar a palavra secreta: ")
while(not acertou):
    # Mostrar letras acertadas
    mostrar_letras_acertadas()

    print("")
    chute = input("Digite uma letra: ")
    i = 0
    for letra in palavra:
        if (chute.upper() == letra):
             letras_acertadas[i] = letra
        i = (i + 1)

    if (letras_acertadas.count("_") == 0):
        print(f"Parabéns, você encontrou a palavra secreta! A palavra é... {palavra}!")
        acertou = True
