const db = require('./db');

// Cria tabelas somente quando necessário. Nunca apaga dados existentes.
async function gerenciarTabela(nomeTabela, sqlCreate) {
    const [tabelas] = await db.pool.query(
        `SELECT 1 FROM information_schema.tables
         WHERE table_schema = DATABASE() AND table_name = ?`,
        [nomeTabela]
    );
    if (tabelas.length === 0) {
        await db.pool.query(sqlCreate);
        console.log(`Tabela "${nomeTabela}" criada.`);
    } else {
        console.log(`Tabela "${nomeTabela}" já existe; dados preservados.`);
    }
}

async function criar_estrutura() {
    try {
        // Tabela cliente
        await gerenciarTabela('cliente', `
            CREATE TABLE cliente (
                id INT(11) NOT NULL AUTO_INCREMENT,
                idConcessionária INT(11) NOT NULL,
                nome VARCHAR(50) NOT NULL,
                celular CHAR(15) NOT NULL,
                email VARCHAR(50) NOT NULL,
                cpf CHAR(14) NOT NULL,
                senha VARCHAR(256) NOT NULL,
                PRIMARY KEY (id),
                UNIQUE KEY email (email),
                UNIQUE KEY cpf (cpf)
            ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
             TRUNCATE TABLE cliente;

        `);

        // Tabela carro com a coluna 'imagem'
        await gerenciarTabela('carro', `
            CREATE TABLE carro (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idSite_URL INT,
                idCompra INT,
                marca VARCHAR(15) NOT NULL,
                cor VARCHAR(15) NOT NULL,
                placa CHAR(7) NOT NULL UNIQUE,
                chassi VARCHAR(17),
                motor FLOAT NOT NULL,
                versao VARCHAR(15) NOT NULL,
                preco DECIMAL(10,2) NOT NULL,
                imagem VARCHAR(255)
            ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
             TRUNCATE TABLE carro;`);

        // Tabela de compras: registra o cliente, a data, o total e o pagamento.
        await gerenciarTabela('compra', `CREATE TABLE compra (
            id INT NOT NULL AUTO_INCREMENT,
            idCliente INT NOT NULL,
            dataCompra DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            totalCompra DECIMAL(10,2) NOT NULL,
            formaPagamento VARCHAR(40) NOT NULL,
            descricao VARCHAR(255),

            PRIMARY KEY (id),

            INDEX idx_compra_cliente_data (idCliente, dataCompra),

            CONSTRAINT fk_compra_cliente
                FOREIGN KEY (idCliente)
                REFERENCES cliente(id)
                ON UPDATE CASCADE ON DELETE RESTRICT

        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
         TRUNCATE TABLE compra;`);

        // Itens vinculam cada veículo à compra e guardam o preço praticado.
        await gerenciarTabela('compra_item', `
            CREATE TABLE compra_item (
                id INT NOT NULL AUTO_INCREMENT,
                idCompra INT NOT NULL,
                idCarro INT NOT NULL,
                precoUnitario DECIMAL(10,2) NOT NULL,
                PRIMARY KEY (id),
                UNIQUE KEY uk_compra_item_carro (idCarro),
                CONSTRAINT fk_item_compra
                    FOREIGN KEY (idCompra) REFERENCES compra(id)
                    ON UPDATE CASCADE ON DELETE CASCADE,
                CONSTRAINT fk_item_carro
                    FOREIGN KEY (idCarro) REFERENCES carro(id)
                    ON UPDATE CASCADE ON DELETE RESTRICT
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
             TRUNCATE TABLE compra_item;
        `);

    } catch (error) {
        console.error('Erro ao criar estrutura:', error);
        throw error;
    }
}

async function inserir_clientes() {
    try {
        const sql = `
            INSERT INTO cliente (idConcessionária, nome, cpf, email, celular, senha) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const valores = [
            1,
            'Richard',
            '148.211.069-57',
            'bellusci.richard@escola.pr.gov.br',
            '(42)99931-8655',
            '$2b$10$NePo4EA.hwP0K/L6mCuABOKgp5PW3yVc6D9vsyehyTC4J.9JI2Gyu'
        ];

        await db.pool.query(sql, valores);
        console.log('Clientes inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir cliente:', error);
    }
}

async function inserir_carros() {
    try {
        const sql = `
            INSERT INTO carro (marca, cor, placa, chassi, motor, versao, preco, imagem) 
            VALUES ?
        `;

        // Imagens apontando para veículos específicos correspondentes às marcas
        // [marca, cor, placa, chassi, motor, versao, preco, imagem]
        const valoresCarros = [
            ['Toyota', 'Preto', 'ABC1234', '9BWZZZ377VT004251', 2.0, 'XLE', 89900.00, 'http://localhost:3000/img/1_xle.jpg'],
            ['Chevrolet', 'Branco', 'XYZ5678', '9BWZZZ377VT004252', 1.0, 'LTZ', 68900.00, 'http://localhost:3000/img/1_ltz.jpg'],
            ['Volkswagen', 'Cinza', 'MNO9012', '9BWZZZ377VT004253', 1.4, 'Highline', 92500.00, 'http://localhost:3000/img/1_highline.jpg'],
            ['Fiat', 'Vermelho', 'QWE3456', '9BWZZZ377VT004254', 1.3, 'Drive', 55900.00, 'http://localhost:3000/img/1_drive.jpg'],
            ['Hyundai', 'Prata', 'RTY7890', '9BWZZZ377VT004255', 1.0, 'Comfort', 58900.00, 'http://localhost:3000/img/1_comfort.jpg'],
            ['Honda', 'Azul', 'UIO1122', '9BWZZZ377VT004256', 1.5, 'EXL', 132900.00, 'http://localhost:3000/img/1_exl.jpg'],
            ['Jeep', 'Verde', 'PAS3344', '9BWZZZ377VT004257', 1.3, 'Longitude', 125900.00, 'http://localhost:3000/img/1_longitude.jpg'],
            ['Nissan', 'Preto', 'DFG5566', '9BWZZZ377VT004258', 1.6, 'Advance', 112900.00, 'http://localhost:3000/img/1_advance.jpg'],
            ['Renault', 'Branco', 'HJK7788', '9BWZZZ377VT004259', 1.0, 'Zen', 45900.00, 'http://localhost:3000/img/1_zen.jpg'],
            ['Peugeot', 'Cinza', 'LZX9900', '9BWZZZ377VT004260', 1.6, 'Allure', 76900.00, 'http://localhost:3000/img/1_allure.jpg'],
            ['Citroën', 'Azul', 'VBN1223', '9BWZZZ377VT004261', 1.0, 'Feel', 62900.00, 'http://localhost:3000/img/1_feel.jpg'],
            ['Ford', 'Preto', 'KLY4455', '9BWZZZ377VT004262', 1.5, 'Titanium', 119900.00, 'http://localhost:3000/img/1_titanium.jpg'],
            ['Toyota', 'Prata', 'JHG6677', '9BWZZZ377VT004263', 1.8, 'GLi', 128900.00, 'http://localhost:3000/img/1_gli.jpg'],
            ['Chevrolet', 'Vermelho', 'POW8899', '9BWZZZ377VT004264', 1.2, 'Premier', 124900.00, 'http://localhost:3000/img/1_premier.jpg'],
            ['Volkswagen', 'Preto', 'BVC3322', '9BWZZZ377VT004265', 1.0, 'Comfortline', 84500.00, 'http://localhost:3000/img/1_comfortline.jpg'],
            ['Fiat', 'Branco', 'CXZ4411', '9BWZZZ377VT004266', 1.0, 'Like', 42900.00, 'http://localhost:3000/img/1_like.jpg'],
            ['Hyundai', 'Cinza', 'ZSE5522', '9BWZZZ377VT004267', 1.6, 'Limited', 139900.00, 'http://localhost:3000/img/1_limited.jpg'],
            ['Honda', 'Prata', 'XDR6633', '9BWZZZ377VT004268', 2.0, 'Touring', 149900.00, 'http://localhost:3000/img/1_touring.jpg'],
            ['Jeep', 'Branco', 'CFT7744', '9BWZZZ377VT004269', 2.0, 'Limited', 159900.00, 'http://localhost:3000/img/1_limited.jpg'],
            ['Nissan', 'Vermelho', 'VGY8855', '9BWZZZ377VT004270', 1.6, 'Exclusive', 109900.00, 'http://localhost:3000/img/1_exclusive.jpg'],
            ['Caoa Chery', 'Preto', 'BHU9966', '9BWZZZ377VT004271', 1.5, 'Pro', 104900.00, 'http://localhost:3000/img/1_pro.jpg'],
            ['Mitsubishi', 'Cinza', 'NJI1177', '9BWZZZ377VT004272', 2.4, 'HPE', 229900.00, 'http://localhost:3000/img/1_hpe.jpg'],
            ['BMW', 'Azul', 'MKO2288', '9BWZZZ377VT004273', 2.0, 'GP', 219900.00, 'http://localhost:3000/img/1_gp.jpg'],
            ['Audi', 'Branco', 'LPA3399', '9BWZZZ377VT004274', 2.0, 'Performance', 249900.00, 'http://localhost:3000/img/1_performance.jpg'],
            ['Volvo', 'Preto', 'PQW4400', '9BWZZZ377VT004275', 2.0, 'Ultimate', 349900.00, 'http://localhost:3000/img/1_ultimate.jpg']
        ];

        await db.pool.query(sql, [valoresCarros]);
        console.log('25 carros inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir carros:', error);
    }
}

async function executar() {
    try {
        await criar_estrutura();
        await inserir_clientes();
        await inserir_carros();
    } catch (error) {
        console.error('Falha crítica na execução do script.');
    } finally {
        if (db.pool && typeof db.pool.end === 'function') {
            await db.pool.end();
        }
        process.exit(0);
    }
}

executar();