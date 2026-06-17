class Quarto:
    def __init__ (self, numero, tipo, valor):
        self.__numero = numero
        self.__tipo = tipo
        self.__valor = valor
        self.__reserva = 'Disponível'

    # Encapsulamento

    def exibir_detalhes(self):
        print(f'Quarto: {self.__numero}\nTipo: {self.__tipo}\nDiária: {self.__valor}\nReserva: {self.__reserva}')
    
    def reservar(self):
        if (self.__reserva = 'Disponível'):
            self.__reserva = 'Indisponível'
            print('Quarto reservado com sucesso!')
        else:
            print('Sinto muito, este quarto está indisponível')

    def liberar(self):
        if (self.__reserva = 'Indisponível'):
            self.__reserva = 'Disponível'
            print('Quarto liberado com sucesso!')
        else:
            print('Este quarto já estava liberado')
