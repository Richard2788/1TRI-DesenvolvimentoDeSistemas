# COPIE E COLE ESTE ENUNCIADO NO TERMINAL EM UM ARQUIVO .py. 
# Para executar no terminal use "python3 nome_arquivo.py"
# Use somente o Classroom e o GitHub. Uso do Google ou qualquer tipo de IA = zero!
# Link GitHub professor: https://github.com/profpatrickoli/1TRI-DesSistemas
# 1) (0,5 p) Crie variáveis para armazenar seu nome, nota da prova escrita, série e turma. Após isso, mostre no terminal uma mensagem personalizada se apresentando.

# 2) (0,5 p) Crie uma lista com 3 atividades que você gosta de fazer no final de semana.

# 3) (1,0 p) Crie uma condição que verifica se sua nota da prova é maior que a média 1,8.

# 4) (1,0 p) Crie uma função mostra no terminal a quantidade de litros de água que devem ser consumidos diariamente por uma pessoa. Depois execute a função colocando um peso como parâmetro.
# Para calcular, siga a fórmula: qtd_litros = 0,035 * peso.

# 5) (1,0 p) Crie um código que verifica se "estudar" existe na lista criada da questão 2. Use o laço de repetição que preferir.

# 6) (1,0 p) Crie um laço de repetição que conta de 1 a 128, mas ao invés de somar 1 no contador, multiplique-o por 2.

print('-------1-------')
nome = 'Richard'
nota = 3.0
serie = 3
turma = 'DSC'
print(f'Oi, sou {nome}! Estudo no Colégio Estadual Presidente Kennedy, na série {serie} e turma {turma}!')
print('-------1-------')

print('-------2-------')
atividades = ['Jogar jogos digitais', 'Ir para um curso de preparação missionária da IJSUD', 'Dormir 8 horas por dia']
print('-------2-------')

print('-------3-------')
if (nota > 1.8):
    print(f'{nome}, sua nota é maior que a média!')
elif (nota == 1.8):
    print(f'{nome}, sua nota é igual à média')
else:
    print(f'{nome}, sua nota é menor que a média')
print('-------3-------')

print('-------4-------')
def quantidade_de_litros(nomePessoa, peso):
    qtd_litros = 0.035 * peso
    print(f'{nomePessoa} deve consumir {qtd_litros} litros de água por dia')
quantidade_de_litros('George', 65.1)
print('-------4-------')

print('-------5-------')
i = 0
truePalavra = 0
while(not i >= len(atividades)):
    if (atividades[i].lower() in 'estudar'):
        truePalavra = 1
    i = (i + 1)
if (truePalavra == 1):
    print(f'{nome} gosta de estudar no final de semana!')
else:
    print(f'{nome} provavelmente não gosta de estudar no final de semana!')
print('-------5-------')

print('-------6-------')
cont = 0
while(not cont >= 128):
    if (cont <= 0):
        cont = 1
    else:
        cont = (cont * 2)
    print(cont)
print('-------6-------')