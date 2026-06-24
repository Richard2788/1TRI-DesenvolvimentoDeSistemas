import random
class Carro:
    # método construtor
    def __init__(self, marca, modelo, placa, diaria):
        self.marca = marca
        self.modelo = modelo
        self.placa = placa
        self.diaria = diaria
        self.quilometragem = 0  
        self.disponibilidade = True

    # métodos da classe
    def exibir(self):
        if (not self.disponibilidade == True):
            print(f"\n--- Carro ---\nMarca: {self.marca}\nModelo: {self.modelo}\nPlaca: {self.placa}\nValor da diária: {self.diaria}\nQuilometragem: {self.quilometragem}\nDisponibidade: Indisponível")
        else:
            print(f"\n--- Carro ---\nMarca: {self.marca}\nModelo: {self.modelo}\nPlaca: {self.placa}\nValor da diária: {self.diaria}\nQuilometragem: {self.quilometragem}\nDisponibidade: Disponível")

    def alugar(self):
        if (not self.disponibilidade == True):
            print("\nO carro está indisponível")
        else:
            self.disponibilidade = False
            print("\nO carro foi alugado com sucesso!")

    def devolver(self, valor):
        if (not valor > 0 or not self.disponibilidade == False):
            if (not valor > 0):
                print("\nValor inválido de quilometragem, o valor deve ser maior que a quilometragem atual")
            else:
                print("\nO carro não foi alugado")
        else:
            self.quilometragem = self.quilometragem + valor
            self.disponibilidade = True
            print("\nDevolução efetuada com sucesso!")
