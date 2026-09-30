const db = require('./db');

async function criar_estrutura() {
    try {
        await db.pool.query(`
            DROP TABLE IF EXISTS cliente;
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
                ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
            TRUNCATE TABLE cliente;
                `);
        console.log('Estrutura do banco de dados criada com sucesso!');
    } catch (error) {
        console.log(error);
    }
}

async function inserir_clientes() {
    try {
        await db.pool.query(`
            INSERT INTO cliente (idConcessionária, nome, cpf, email, celular, senha) VALUES (
            1,'Richard','148.211.069-57','bellusci.richard@escola.pr.gov.br','(42)99931-8655','$2b$10$kMxKeCHf4CZP0ArEn21b9ekxzo3Zp0ReP4N/w1YIS6VbL6sD2wA0q');
        `);
        console.log('Clientes inseridos com sucesso!');
    } catch (error) {
        console.log(error);
    }
}

async function executar() {
    await criar_estrutura();
    await inserir_clientes();
    process.exit(0);
}

executar();
