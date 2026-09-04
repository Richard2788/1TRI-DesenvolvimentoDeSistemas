CREATE TABLE Compra 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 idCliente INT NOT NULL,  
 idVendedor INT NOT NULL,  
 idConcessionária INT NOT NULL,  
 tipo_pagamento VARCHAR(15) NOT NULL,  
 descricao VARCHAR(500)
);

INSERT INTO Compra (tipo_pagamento, descricao) VALUES
('Cartão de Crédito', 'Compra de veículo novo'),
('Boleto Bancário', 'Compra de veículo usado'),
('Transferência Bancária', 'Compra de veículo seminovo');

ALTER TABLE Compra ADD FOREIGN KEY(idCliente) REFERENCES Cliente (idCliente)
ALTER TABLE Compra ADD FOREIGN KEY(idVendedor) REFERENCES Vendedor (idVendedor)
ALTER TABLE Compra ADD FOREIGN KEY(idConcessionária) REFERENCES Concessionária (idConcessionária)