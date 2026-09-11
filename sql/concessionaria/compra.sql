CREATE TABLE compra (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idCliente INT NOT NULL,
    idVendedor INT NOT NULL,
    idConcessionária INT NOT NULL,
    tipo_pagamento VARCHAR(15) NOT NULL,
    descricao VARCHAR(500)
);

INSERT INTO
    compra (idCliente, idVendedor, idConcessionária, tipo_pagamento, descricao)
VALUES (
        1,
        1,
        1,
        'Cartão de Crédito',
        'Compra de veículo novo'
    ),
    (
        1,
        1,
        1,
        'Boleto Bancário',
        'Compra de veículo usado'
    ),
    (
        1,
        1,
        1,
        'Transferência Bancária',
        'Compra de veículo seminovo'
    );

ALTER TABLE compra
ADD FOREIGN KEY (idCliente) REFERENCES cliente (idCliente);
ALTER TABLE compra
ADD FOREIGN KEY (idVendedor) REFERENCES vendedor (idVendedor);
ALTER TABLE compra
ADD FOREIGN KEY (idConcessionária) REFERENCES concessionária (idConcessionária);