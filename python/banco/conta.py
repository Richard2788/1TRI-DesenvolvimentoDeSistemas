class Conta:
    # Método construtor
    def __init__(self, titular, agencia, numero):
        self.__titular = titular
        self.__agencia = agencia
        self.__numero = numero
        self.__saldo = 0

    #Ecapsulamento (getters e setters)
    @property
    def titular(self):
        return (self.__titular)

    @titular.setter
    def titular(self, novo_nome):
        self.__titular = novo_nome
    
    def extrato(self):
        print(f"O saldo da {self.__titular} é {self.__saldo}")

    def deposito(self, valor):
        if (valor > 0):
            self.__saldo = (self.__saldo + valor)
            print('Depósito realizado com sucesso!')
        else:
            print('Valor acima do disponível.')

    def saque(self, valor):
        if (valor <= self.__saldo and valor > 0):
            self.__saldo = (self.__saldo - valor)
            print('Saque realizado com sucesso!')
        else:
            print('Erro ao efetuar saque.')

    def transferencia(self, conta_destino, valor):
        if (valor <= self.__saldo and valor > 0):
            self.saque(valor)
            conta_destino.deposito(valor)
            print('Transferência realizada com sucesso!')
        else:
            print('Erro ao efetuar transferência.')

