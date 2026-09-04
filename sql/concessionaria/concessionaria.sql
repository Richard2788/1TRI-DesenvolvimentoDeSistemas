CREATE TABLE concessionária 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 nome VARCHAR(25) NOT NULL,  
 cnpj CHAR(18) NOT NULL,  
 email VARCHAR(50) NOT NULL,  
 cep CHAR(9) NOT NULL,  
 num_lote INT NOT NULL,  
 UNIQUE (nome,email,cep,num_lote)
);

INSERT INTO concessionária (
    nome, cnpj, email, cep, num_lote
) VALUES (
    'Robert', '12.345.678/0001-90', 'robert.marx@escola.pr.gov.br', '88015-000', 123
)