CREATE TABLE compra (
    id INT NOT NULL AUTO_INCREMENT,
    idCliente INT NOT NULL,
    idVendedor INT NOT NULL,
    idConcessionária INT NOT NULL,
    dataCompra DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tipo_pagamento VARCHAR(40) NOT NULL,
    descricao VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),

    INDEX idx_compra_cliente_data (idCliente, dataCompra),
    INDEX idx_compra_vendedor (idVendedor),
    INDEX idx_compra_concessionaria (idConcessionária),

    CONSTRAINT fk_compra_cliente
        FOREIGN KEY (idCliente)
        REFERENCES cliente(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,

    CONSTRAINT fk_compra_vendedor
        FOREIGN KEY (idVendedor)
        REFERENCES vendedor(idVendedor)
        ON UPDATE CASCADE ON DELETE RESTRICT,

    CONSTRAINT fk_compra_concessionaria
        FOREIGN KEY (idConcessionária)
        REFERENCES concessionária(idConcessionária)
        ON UPDATE CASCADE ON DELETE RESTRICT

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO compra (
    idCliente,
    idVendedor,
    idConcessionária,
    tipo_pagamento,
    descricao
)
VALUES
    (1, 1, 1, 'Cartão de Crédito', 'Compra de veículo novo'),
    (1, 1, 1, 'Boleto Bancário', 'Compra de veículo usado'),
    (1, 1, 1, 'Transferência Bancária', 'Compra de veículo seminovo');
