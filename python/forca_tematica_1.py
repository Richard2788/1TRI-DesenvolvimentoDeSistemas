import random

def jogar():
    while(True):
        debug = int(input("Digite um número de 1 se for inspecionar o código, senão digite 0: "))
        if (debug == 1):
            print("Debug ativado. Você pode inspecionar o código para entender como ele funciona.")
            break
        elif (debug == 0):
            arquivo = open("jojo_2.txt", "r")
            print("Debug desativado. O jogo começará normalmente.")
            break
        else:
            print("Número inválido. Por favor, escolha o número 1 ou 0.\n")
    print("---------------------\n\n")

    print("Bem-vindo ao jogo da forca temática! Escolha um número para começar:")
    while(True):
        numero = int(input("Digite um número de 1 a 3: "))
        if (numero == 1):
            arquivo = open("c&q_1.txt", "r")
            print("Tema - Jogo: Command and Conquer: Kanes's Wrath")
            break
        elif (numero == 2):
            arquivo = open("jojo_2.txt", "r")
            print("Tema - Anime: JoJo's Bizarre Adventure: Parts 1-7")
            break
        elif (numero == 3):
            arquivo = open("nezha2-1.txt", "r")
            print("Tema - Filme: Ne Zha 2: O Renascer da Alma")
            break
        else:
            print("Número inválido. Por favor, escolha um número de 1 a 3.\n")
    print("\n")

    numero = random.randint(0, 50)
    letras_acertadas = []
    item = []
    for linha in arquivo:
        item.append(linha.strip())

    palavra = item[numero]
    if (debug == 1):
        print(letras_acertadas)
        print(palavra)

    for letra in palavra:
        if (letra != " "):
            letras_acertadas.append("_")
        else:
            letras_acertadas.append(" ")
    if (debug == 1):
        print(letras_acertadas)

    acertou = False
    enforcou = False
    limite_tentativas = (len(palavra) + 6)
    tentativa = 1

    def mostrar_letras_acertadas():
        for letra in letras_acertadas:
            print(letra, end = " ")


    print("Tente adivinhar a palavra secreta:")
    while(not acertou and not enforcou):
        # Mostrar letras acertadas
        mostrar_letras_acertadas()

        chute = input("\n\nDigite uma letra: ")
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

    if (__name__ == '__main__'):
        jogar()