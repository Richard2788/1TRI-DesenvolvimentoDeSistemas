import adivinhacao_2
import forca_tematica_1
while(True):
    print("1 - Adivinhação")
    print("2 - Forca")
    print("3 - Sair")


    opcao = int(input("Digite a opção desejada:"))

    if opcao == 1:
        adivinhacao_2.jogar()
    elif opcao == 2:
        forca_tematica_1.jogar()
    elif opcao == 3:
        break
    else:
        print("Opção inválida")
