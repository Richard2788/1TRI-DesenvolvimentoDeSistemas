from conta import Conta
conta1 = Conta('Richard', 1234, '929.392.913-53')
conta1.extrato()
conta1.deposito(1000)
conta1.extrato()
conta1.saque(300)
conta1.extrato()
conta1.saque(1500)
conta1.extrato()
conta2 = Conta('Rabele', 1235, '201.234.502-66')
conta2.extrato()
conta1.transferencia(conta2, 200)
conta2.extrato()
conta2.titular = 'Rael'
conta2.extrato()
print(f'''Olá, {conta2.titular}! :)
Agência: {conta2.agencia} 
Conta: {conta2.numero}
Saldo: {conta2.saldo}
Senha: {conta2.senha}
CPF: {conta2.cpf}
Chaves pix: {conta2.chavepix}''')