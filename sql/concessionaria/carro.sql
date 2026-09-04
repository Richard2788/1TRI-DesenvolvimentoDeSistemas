CREATE TABLE carro 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 idSite_URL INT,  
 idCompra INT,  
 marca VARCHAR(15) NOT NULL,  
 cor VARCHAR(15) NOT NULL,  
 placa CHAR(7) NOT NULL UNIQUE,  
 chassi VARCHAR(17),  
 motor FLOAT NOT NULL,  
 versao VARCHAR(15) NOT NULL
);

INSERT INTO carro (marca, cor, placa, chassi, motor, versao) VALUES
('Toyota', 'Preto', 'ABC1234', '9BWZZZ377VT004251', 2.0, 'XLE'),
('Honda', 'Branco', 'XYZ5678', '1HGCM82633A123456', 1.5, 'EX'),
('Ford', 'Vermelho', 'DEF9012', '1FAFP404X1F123456', 2.3, 'SE');

ALTER TABLE carro ADD FOREIGN KEY(idSite_URL) REFERENCES Site_URL (idSite_URL)
ALTER TABLE carro ADD FOREIGN KEY(idCompra) REFERENCES Compra (idCompra)