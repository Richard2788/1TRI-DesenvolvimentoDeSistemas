CREATE TABLE vendedor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idConcessionária INT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    senha VARCHAR(25) NOT NULL,
    celular CHAR(14) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    cpf CHAR(14) NOT NULL UNIQUE
);

INSERT INTO
    vendedor (
        idConcessionária,
        nome,
        senha,
        celular,
        email,
        cpf
    )
VALUES (
        1,
        'Robert',
        '123456',
        '(48)99999-9999',
        'robert@example.com',
        '123.456.789-00'
    ),
    (
        2,
        'Isabel',
        '654321',
        '(48)88888-8888',
        'isabel@example.com',
        '098.765.432-10'
    );

ALTER TABLE vendedor
ADD FOREIGN KEY (idConcessionária) REFERENCES concessionária (idConcessionária);