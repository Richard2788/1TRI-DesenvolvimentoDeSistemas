const db = require('./db');

// Função auxiliar reutilizável para verificar, remover se necessário e criar tabelas
async function gerenciarTabela(nomeTabela, sqlCreate) {
    // 1. Verifica se a tabela existe no banco de dados atual
    const [tabelas] = await db.pool.query(`
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = DATABASE() 
          AND table_name = ?
    `, [nomeTabela]);

    let deveCriar = true;

    // 2. Se a tabela existe, checa se possui registros
    if (tabelas.length > 0) {
        const [rows] = await db.pool.query(`SELECT COUNT(*) AS total FROM ??`, [nomeTabela]);
        
        if (rows[0].total > 0) {
            // Se tem registros, remove a tabela antiga
            await db.pool.query(`DROP TABLE ??`, [nomeTabela]);
            console.log(`Tabela antiga "${nomeTabela}" com registros detectada e removida.`);
        } else {
            // Se a tabela já existe e está vazia, ignora a recriação
            deveCriar = false;
            await db.pool.query(`TRUNCATE TABLE ??`, [nomeTabela]);
            console.log(`Tabela "${nomeTabela}" já existe e está vazia. Apenas IDs corrigidos.`);
        }
    }

    // 3. Cria a tabela se não existia ou se foi removida por conter registros
    if (deveCriar) {
        await db.pool.query(sqlCreate);
        console.log(`Estrutura da tabela "${nomeTabela}" criada com sucesso!`);
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
                imagem VARCHAR(255)
            ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
            TRUNCATE TABLE carro;
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
            INSERT INTO carro (marca, cor, placa, chassi, motor, versao, imagem) 
            VALUES ?
        `;
        
        // Imagens apontando para veículos específicos correspondentes às marcas
        const valoresCarros = [
            ['Toyota', 'Preto', 'ABC1234', '9BWZZZ377VT004251', 2.0, 'XLE', 'https://s3.amazonaws.com/altimus2.arquivos.prod/a8a7c2d3-96d6-4a7d-b881-9cd93b9f718e/fotos/veiculo/21e0c95d-2e16-4147-befa-42219a797a0c/038f714f520644a5add82187009699ff_1786364038954.jpg'],
            ['Chevrolet', 'Branco', 'XYZ5678', '9BWZZZ377VT004252', 1.0, 'LTZ', 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Chevrolet_Onix_Sedan_LTZ_1.0_Turbo_2020.jpg'],
            ['Volkswagen', 'Cinza', 'MNO9012', '9BWZZZ377VT004253', 1.4, 'Highline', 'https://upload.wikimedia.org/wikipedia/commons/8/87/2018_Volkswagen_Golf_SE_TSi_1.4_Front.jpg'],
            ['Fiat', 'Vermelho', 'QWE3456', '9BWZZZ377VT004254', 1.3, 'Drive', 'https://upload.wikimedia.org/wikipedia/commons/0/07/2018_Fiat_Argo_Drive_1.3.jpg'],
            ['Hyundai', 'Prata', 'RTY7890', '9BWZZZ377VT004255', 1.0, 'Comfort', 'https://upload.wikimedia.org/wikipedia/commons/2/26/2020_Hyundai_HB20_Evolution_1.0.jpg'],
            ['Honda', 'Azul', 'UIO1122', '9BWZZZ377VT004256', 1.5, 'EXL', 'https://upload.wikimedia.org/wikipedia/commons/2/23/2016_Honda_Civic_LX_Sedan_1.8.jpg'],
            ['Jeep', 'Verde', 'PAS3344', '9BWZZZ377VT004257', 1.3, 'Longitude', 'https://upload.wikimedia.org/wikipedia/commons/4/41/2019_Jeep_Renegade_Latitude_1.3L.jpg'],
            ['Nissan', 'Preto', 'DFG5566', '9BWZZZ377VT004258', 1.6, 'Advance', 'https://upload.wikimedia.org/wikipedia/commons/c/c8/2020_Nissan_Kicks_SV.jpg'],
            ['Renault', 'Branco', 'HJK7788', '9BWZZZ377VT004259', 1.0, 'Zen', 'https://upload.wikimedia.org/wikipedia/commons/d/df/2018_Renault_Kwid_Zen_1.0.jpg'],
            ['Peugeot', 'Cinza', 'LZX9900', '9BWZZZ377VT004260', 1.6, 'Allure', 'https://upload.wikimedia.org/wikipedia/commons/3/30/2020_Peugeot_208_Allure_1.2.jpg'],
            ['Citroën', 'Azul', 'VBN1223', '9BWZZZ377VT004261', 1.0, 'Feel', 'https://upload.wikimedia.org/wikipedia/commons/9/90/2022_Citroen_C3_Feel_1.0.jpg'],
            ['Ford', 'Preto', 'KLY4455', '9BWZZZ377VT004262', 1.5, 'Titanium', 'https://upload.wikimedia.org/wikipedia/commons/8/82/2018_Ford_EcoSport_Titanium.jpg'],
            ['Toyota', 'Prata', 'JHG6677', '9BWZZZ377VT004263', 1.8, 'GLi', 'https://upload.wikimedia.org/wikipedia/commons/1/1b/2017_Toyota_Corolla_GLi.jpg'],
            ['Chevrolet', 'Vermelho', 'POW8899', '9BWZZZ377VT004264', 1.2, 'Premier', 'https://upload.wikimedia.org/wikipedia/commons/1/16/2021_Chevrolet_Tracker_Premier.jpg'],
            ['Volkswagen', 'Preto', 'BVC3322', '9BWZZZ377VT004265', 1.0, 'Comfortline', 'https://upload.wikimedia.org/wikipedia/commons/4/4f/2020_Volkswagen_Polo_Comfortline.jpg'],
            ['Fiat', 'Branco', 'CXZ4411', '9BWZZZ377VT004266', 1.0, 'Like', 'https://upload.wikimedia.org/wikipedia/commons/1/18/2021_Fiat_Mobi_Like_1.0.jpg'],
            ['Hyundai', 'Cinza', 'ZSE5522', '9BWZZZ377VT004267', 1.6, 'Limited', 'https://upload.wikimedia.org/wikipedia/commons/1/1e/2021_Hyundai_Creta_Limited.jpg'],
            ['Honda', 'Prata', 'XDR6633', '9BWZZZ377VT004268', 2.0, 'Touring', 'https://upload.wikimedia.org/wikipedia/commons/3/32/2020_Honda_HR-V_Touring.jpg'],
            ['Jeep', 'Branco', 'CFT7744', '9BWZZZ377VT004269', 2.0, 'Limited', 'https://upload.wikimedia.org/wikipedia/commons/2/21/2020_Jeep_Compass_Limited.jpg'],
            ['Nissan', 'Vermelho', 'VGY8855', '9BWZZZ377VT004270', 1.6, 'Exclusive', 'https://upload.wikimedia.org/wikipedia/commons/5/5a/2021_Nissan_Versa_Exclusive.jpg'],
            ['Caoa Chery', 'Preto', 'BHU9966', '9BWZZZ377VT004271', 1.5, 'Pro', 'https://upload.wikimedia.org/wikipedia/commons/a/a2/2021_Chery_Tiggo_5X_Pro.jpg'],
            ['Mitsubishi', 'Cinza', 'NJI1177', '9BWZZZ377VT004272', 2.4, 'HPE', 'https://upload.wikimedia.org/wikipedia/commons/6/6a/2020_Mitsubishi_L200_Triton_HPE.jpg'],
            ['BMW', 'Azul', 'MKO2288', '9BWZZZ377VT004273', 2.0, 'GP', 'https://upload.wikimedia.org/wikipedia/commons/8/8d/2020_BMW_320i_Sport_GP.jpg'],
            ['Audi', 'Branco', 'LPA3399', '9BWZZZ377VT004274', 2.0, 'Performance', 'https://upload.wikimedia.org/wikipedia/commons/3/31/2021_Audi_A4_Performance.jpg'],
            ['Volvo', 'Preto', 'PQW4400', '9BWZZZ377VT004275', 2.0, 'Ultimate', 'https://upload.wikimedia.org/wikipedia/commons/5/53/2022_Volvo_XC60_Ultimate.jpg']
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