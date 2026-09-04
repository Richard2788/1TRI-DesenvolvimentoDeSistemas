CREATE TABLE compra 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 idCliente INT NOT NULL,  
 idVendedor INT NOT NULL,  
 idConcessionária INT NOT NULL,  
 tipo_pagamento VARCHAR(15) NOT NULL,  
 descricao VARCHAR(500)
);

INSERT INTO compra (tipo_pagamento, descricao) VALUES
('Cartão de Crédito', 'Compra de veículo novo'),
('Boleto Bancário', 'Compra de veículo usado'),
('Transferência Bancária', 'Compra de veículo seminovo');

ALTER TABLE compra ADD FOREIGN KEY(idCliente) REFERENCES Cliente (idCliente)
ALTER TABLE compra ADD FOREIGN KEY(idVendedor) REFERENCES Vendedor (idVendedor)
ALTER TABLE compra ADD FOREIGN KEY(idConcessionária) REFERENCES Concessionária (idConcessionária)