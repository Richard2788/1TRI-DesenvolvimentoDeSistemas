const db = require('./db');

async function criar_estrutura() {
    try {
        // 1. Verifica se a tabela existe no banco de dados atual
        const [tabelas] = await db.pool.query(`
            SELECT 1 
            FROM information_schema.tables 
            WHERE table_schema = DATABASE() 
              AND table_name = 'cliente'
        `);

        let deveCriar = true;

        // 2. Se a tabela existe, checa se ela possui registros
        if (tabelas.length > 0) {
            const [rows] = await db.pool.query('SELECT COUNT(*) AS total FROM cliente');
            const totalRegistros = rows[0].total;

            if (totalRegistros > 0) {
                // Se tem registros, dropa a tabela antiga
                await db.pool.query('DROP TABLE cliente');
                console.log('Tabela antiga com registros detectada e removida.');
            } else {
                // Se a tabela existe mas está vazia, não precisamos fazer nada
                deveCriar = false;
                console.log('Tabela "cliente" já existe e está vazia. Nenhuma alteração feita.');
            }
        }

        // 3. Cria a tabela se ela não existia ou se foi dropada por conter dados
        if (deveCriar) {
            await db.pool.query(`
                CREATE TABLE cliente (
                    id int(11) NOT NULL AUTO_INCREMENT,
                    idConcessionária int(11) NOT NULL,
                    nome varchar(50) NOT NULL,
                    celular char(15) NOT NULL,
                    email varchar(50) NOT NULL,
                    cpf char(14) NOT NULL,
                    senha varchar(256) NOT NULL,
                    PRIMARY KEY (id),
                    UNIQUE KEY email (email),
                    UNIQUE KEY cpf (cpf)
                ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
            `);
            console.log('Estrutura da tabela "cliente" criada com sucesso!');
        }
        await db.pool.query(`
            CREATE TABLE IF NOT EXISTS carro (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idSite_URL INT,
                idCompra INT,
                marca VARCHAR(15) NOT NULL,
                cor VARCHAR(15) NOT NULL,
                placa CHAR(7) NOT NULL UNIQUE,
                chassi VARCHAR(17),
                motor FLOAT NOT NULL,
                versao VARCHAR(15) NOT NULL
            ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
            `);
    } catch (error) {
        console.error('Erro ao criar estrutura:', error);
        throw error; // Lança o erro para interromper a execução do script se falhar aqui
    }
}

async function inserir_clientes() {
    try {
        // Boa prática: Usar placeholders (?) para queries parametrizadas (evita quebras e SQL Injection)
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
            '\$2b\$10\$NePo4EA.hwP0K/L6mCuABOKgp5PW3yVc6D9vsyehyTC4J.9JI2Gyu'
        ];

        await db.pool.query(sql, valores);
        console.log('Clientes inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir cliente:', error);
    }
}

async function inserir_carros() {
    try {
        // Correção 1: Para múltiplos registros com placeholders, usa-se (?) e não (?, ?, ...)
        const sql = `
            INSERT INTO carro (marca, cor, placa, chassi, motor, versao) 
            VALUES ?
        `;
        const valoresCarros = [
            ['Toyota', 'Preto', 'ABC1234', '9BWZZZ377VT004251', 2.0, 'XLE'],
            ['Chevrolet', 'Branco', 'XYZ5678', '9BWZZZ377VT004252', 1.0, 'LTZ'],
            ['Volkswagen', 'Cinza', 'MNO9012', '9BWZZZ377VT004253', 1.4, 'Highline'],
            ['Fiat', 'Vermelho', 'QWE3456', '9BWZZZ377VT004254', 1.3, 'Drive'],
            ['Hyundai', 'Prata', 'RTY7890', '9BWZZZ377VT004255', 1.0, 'Comfort'],
            ['Honda', 'Azul', 'UIO1122', '9BWZZZ377VT004256', 1.5, 'EXL'],
            ['Jeep', 'Verde', 'PAS3344', '9BWZZZ377VT004257', 1.3, 'Longitude'],
            ['Nissan', 'Preto', 'DFG5566', '9BWZZZ377VT004258', 1.6, 'Advance'],
            ['Renault', 'Branco', 'HJK7788', '9BWZZZ377VT004259', 1.0, 'Zen'],
            ['Peugeot', 'Cinza', 'LZX9900', '9BWZZZ377VT004260', 1.6, 'Allure'],
            ['Citroën', 'Azul', 'VBN1223', '9BWZZZ377VT004261', 1.0, 'Feel'],
            ['Ford', 'Preto', 'KLY4455', '9BWZZZ377VT004262', 1.5, 'Titanium'],
            ['Toyota', 'Prata', 'JHG6677', '9BWZZZ377VT004263', 1.8, 'GLi'],
            ['Chevrolet', 'Vermelho', 'POW8899', '9BWZZZ377VT004264', 1.2, 'Premier'],
            ['Volkswagen', 'Preto', 'BVC3322', '9BWZZZ377VT004265', 1.0, 'Comfortline'],
            ['Fiat', 'Branco', 'CXZ4411', '9BWZZZ377VT004266', 1.0, 'Like'],
            ['Hyundai', 'Cinza', 'ZSE5522', '9BWZZZ377VT004267', 1.6, 'Limited'],
            ['Honda', 'Prata', 'XDR6633', '9BWZZZ377VT004268', 2.0, 'Touring'],
            ['Jeep', 'Branco', 'CFT7744', '9BWZZZ377VT004269', 2.0, 'Limited'],
            ['Nissan', 'Vermelho', 'VGY8855', '9BWZZZ377VT004270', 1.6, 'Exclusive'],
            ['Caoa Chery', 'Preto', 'BHU9966', '9BWZZZ377VT004271', 1.5, 'Pro'],
            ['Mitsubishi', 'Cinza', 'NJI1177', '9BWZZZ377VT004272', 2.4, 'HPE'],
            ['BMW', 'Azul', 'MKO2288', '9BWZZZ377VT004273', 2.0, 'GP'],
            ['Audi', 'Branco', 'LPA3399', '9BWZZZ377VT004274', 2.0, 'Performance'],
            ['Volvo', 'Preto', 'PQW4400', '9BWZZZ377VT004275', 2.0, 'Ultimate']
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
        // Fecha o pool de conexões se o seu arquivo ./db exportar o pool diretamente, 
        // evitando que o processo do Node fique "preso" aberto
        if (db.pool && typeof db.pool.end === 'function') {
            await db.pool.end();
        }
        process.exit(0);
    }
}

executar();