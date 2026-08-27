CREATE TABLE Concessionária 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 nome VARCHAR(25) NOT NULL,  
 cnpj CHAR(14) NOT NULL,  
 email VARCHAR(25) NOT NULL,  
 cep CHAR(8) NOT NULL,  
 num_lote INT NOT NULL,  
 UNIQUE (nome,email,cep,num_lote)
);

INSERT INTO Concessionária (
    nome, cnpj, email, cep, num_lote
) VALUES (
    'Robert', '12.345.678/0001-90', 'robert.marx@escola.pr.gov.br', '88015-000', 123
)