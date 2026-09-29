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
            `);
        console.log('Estrutura do banco de dados criada com sucesso!');
    } catch (error) {
        console.log(error);
    }
}

criar_estrutura();
