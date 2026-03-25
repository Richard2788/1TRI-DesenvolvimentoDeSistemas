import random

numero = random.randint(0, 50)

palavras = []
arquivo = open("jojo.txt", "r")
for linha in arquivo:
    palavras.append(linha.strip())

print(palavras[numero])
