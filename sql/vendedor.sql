CREATE TABLE Vendedor 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 idConcessionária INT NOT NULL,  
 nome VARCHAR(50) NOT NULL,  
 senha VARCHAR(25) NOT NULL,  
 celular CHAR(12) NOT NULL,  
 email VARCHAR(25) NOT NULL,  
 cpf CHAR(14) NOT NULL,  
 UNIQUE (idConcessionária,nome,senha,celular,email,cpf)
); 

ALTER TABLE Vendedor ADD FOREIGN KEY(idConcessionária) REFERENCES Concessionária (idConcessionária)