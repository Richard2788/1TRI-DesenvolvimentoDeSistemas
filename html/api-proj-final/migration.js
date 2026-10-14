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

async function executar() {
    try {
        await criar_estrutura();
        await inserir_clientes();
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