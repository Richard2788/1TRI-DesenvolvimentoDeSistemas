CREATE TABLE Cliente 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 idConcessionária INT NOT NULL,  
 nome VARCHAR(50) NOT NULL,  
 celular CHAR(14) NOT NULL,  
 email VARCHAR(50) NOT NULL UNIQUE,  
 cpf CHAR(14) NOT NULL UNIQUE,  
 senha VARCHAR(25) NOT NULL
); 

INSERT INTO Cliente (
    nome, celular, email, cpf, senha
) VALUES (
    'Richard', '(42)99931-8655', 'bellusci.richard@escola.pr.gov.br', '148.211.069-57',
        'sábadoanimadodograu123'
)

ALTER TABLE Cliente ADD FOREIGN KEY(idConcessionária) REFERENCES Concessionária (idConcessionária)