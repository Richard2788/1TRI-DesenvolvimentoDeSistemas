class Livro:
    # Método construtor
    def __init__(self, titulo, autor, ano, sinopse):
        self.__titulo = titulo
        self.__autor = autor
        self.__ano = ano
        self.__sinopse = sinopse
        self.__downloads = 0

    #Encapsulamento (getters)

    def exibir(self):
        return print(f'''Título: {self.__titulo}
         Autor: {self.__autor}
         Ano: {self.__ano}
         Sinopse: {self.__sinopse}
         Downloads: {self.__downloads}''')

    def get_downloads(self):
        return (self.__downloads)

    @property
    def downloads(self):
        return (self.__downloads)
    
    @property
    def titulo(self):
        return (self.__titulo)

    @property
    def autor(self):
        return (self.__autor)
    
    @property
    def ano(self):
        return (self.__ano)

    @property
    def sinopse(self):
        return (self.__sinopse)
