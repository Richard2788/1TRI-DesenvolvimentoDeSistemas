CREATE TABLE Site_URL 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 idConcessionária INT,  
 nome_ficticio VARCHAR(25) NOT NULL,  
 dominio VARCHAR(50) NOT NULL,  
 subdominio VARCHAR(15) NOT NULL,  
 protocolo VARCHAR(6) NOT NULL,  
 tdl VARCHAR(5) NOT NULL,  
 query VARCHAR(15) NOT NULL,  
 path VARCHAR(25) NOT NULL,  
 fragment VARCHAR(100) NOT NULL,  
 sld VARCHAR(15) NOT NULL,  
 cctld CHAR(2) NOT NULL,  
 porta VARCHAR(4) NOT NULL
); 

INSERT INTO Site_URL (
    nome_ficticio, dominio, subdominio, protocolo, tdl, query, path, fragment, sld, cctld, porta
) VALUES (
    'Isabel', 'escola.pr.gov.br', 'www', 'https', '.br', 'id=123', '/home', '#section1', 'escola', 'br', '443'
)

ALTER TABLE Site_URL ADD FOREIGN KEY(idConcessionária) REFERENCES Concessionária (id)
