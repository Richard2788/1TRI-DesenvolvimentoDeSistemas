// npm init
// npm i express
const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

// npm i mysql2
// npm i bcrypt
const db = require('./db')
const bcrypt = require('bcrypt')

app.get('/ola', (req, res) => {
    res.send('Hello World!');
});

// quantidade fixa de carros por página
const LIMITE_POR_PAGINA = 10;

app.get('/carros', async (req, res) => {
    try {
        const { busca, categoria, ordenacao, preco_min, preco_max, pagina } = req.query;

        // monta os filtros dinamicamente (apenas como placeholders " ? " para evitar SQL injection)
        const filtros = [];
        const valores = [];

        if (busca && busca.trim() !== '') {
            filtros.push(`CONCAT(marca, ' ', versao) LIKE ?`);
            valores.push(`%${busca.trim()}%`);
        }
        if (categoria && categoria.trim() !== '') {
            filtros.push(`marca = ?`);
            valores.push(categoria.trim());
        }
        if (preco_min !== undefined && preco_min !== '') {
            filtros.push(`preco >= ?`);
            valores.push(Number(preco_min));
        }
        if (preco_max !== undefined && preco_max !== '') {
            filtros.push(`preco <= ?`);
            valores.push(Number(preco_max));
        }

        const where = filtros.length > 0 ? `WHERE ${filtros.join(' AND ')}` : '';

        // ordenação por preço (menor ou maior)
        let orderBy = '';
        if (ordenacao === 'menor preco') {
            orderBy = 'ORDER BY preco ASC';
        } else if (ordenacao === 'maior preco') {
            orderBy = 'ORDER BY preco DESC';
        }

        // paginação: pagina=1 -> 10 primeiros, pagina=2 -> do 11º ao 20º, etc
        let numeroPagina = parseInt(pagina, 10);
        if (isNaN(numeroPagina) || numeroPagina < 1) {
            numeroPagina = 1;
        }
        const offset = (numeroPagina - 1) * LIMITE_POR_PAGINA;

        // total de carros que batem com os filtros (para calcular a quantidade de páginas)
        const [totalResult] = await db.pool.query(
            `SELECT COUNT(*) AS total FROM carro ${where}`,
            valores
        );
        const total = totalResult[0].total;
        const totalPaginas = Math.max(1, Math.ceil(total / LIMITE_POR_PAGINA));

        // se a página pedida não existe, volta para a primeira
        let paginaAtual = numeroPagina;
        if (numeroPagina > totalPaginas) {
            paginaAtual = 1;
        }
        const offsetAtual = (paginaAtual - 1) * LIMITE_POR_PAGINA;

        const [carros] = await db.pool.query(
            `SELECT id, marca, cor, versao, motor, preco, imagem
             FROM carro
             ${where}
             ${orderBy}
             LIMIT ? OFFSET ?`,
            [...valores, LIMITE_POR_PAGINA, offsetAtual]
        );

        // nome e descricao montados a partir dos campos da tabela
        const listaCarros = carros.map((carro) => ({
            id: carro.id,
            nome: `${carro.marca} ${carro.versao}`,
            descricao: `${carro.cor} • motor ${carro.motor.toFixed(1)} L • ${carro.versao}`,
            preco: Number(carro.preco).toFixed(2),
            imagem: carro.imagem
        }));

        res.status(200).json({
            carros: listaCarros,
            total: total,
            pagina: paginaAtual,
            totalPaginas: totalPaginas,
            limite: LIMITE_POR_PAGINA
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

app.post('/cliente', async (req, res) => {
    try {
        const cliente = req.body
        const senhaCript = await bcrypt.hash(cliente.senha, 10)
        cliente.senha = senhaCript

        // envio para o BD
        const resultado = await db.pool.query(
            `INSERT INTO cliente (
                nome, cpf, email, celular, senha
            ) VALUES ( ?, ?, ?, ?, ? )`,
            [cliente.nome, cliente.cpf, cliente.email, cliente.celular, cliente.senha]

        )
        res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso! id = ' + resultado[0].insertId })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get('/clientes', async (req, res) => {
    try {
        const resultado = await db.pool.query(
            `SELECT * FROM cliente;`,
        )
        res.status(201).json({ resultado })
    } catch (error) {
        res.status(500).json({ resposta: error.message });
    };
});

app.get('/clientes/:cpf', async (req, res) => {
    // compara o CPF apenas pelos dígitos, ignorando pontos e traço
    const cpf_param_digits = String(req.params['cpf']).replace(/\D/g, '');
    try {
        const [clientes] = await db.pool.query(
            `SELECT * FROM cliente WHERE REGEXP_REPLACE(cpf, '[^0-9]', '') = ?`,
            [cpf_param_digits]
        );

        if (clientes.length === 0) {
            return res.status(404).json({ erro: 'Cliente não existe no banco de dados' });
        };
        res.status(200).json(clientes[0]);
    } catch (error) {
        res.status(500).json({ resposta: error.message });
    };
});

app.delete('/clientes/:cpf', async (req, res) => {
    const cpf_param_digits = String(req.params['cpf']).replace(/\D/g, '');
    try {
        const [resultado] = await db.pool.query(
            `DELETE FROM cliente WHERE REGEXP_REPLACE(cpf, '[^0-9]', '') = ?`,
            [cpf_param_digits]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Cliente não existe no banco de dados' });
        };
        res.status(200).json({ mensagem: 'Cliente deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ resposta: error.message });
    };
});

app.put('/clientes/:cpf', async (req, res) => {
    const cpf_param_digits = String(req.params['cpf']).replace(/\D/g, '');
    const cliente = req.body;
    if (!cliente || Object.keys(cliente).length === 0) {
        return res.status(400).json({ resposta: "Body não preenchido" });
    } else {
        try {
            // Monta dinamicamente o SET com placeholders para os campos enviados
            const camposPermitidos = ['nome', 'cpf', 'email', 'celular', 'senha'];
            const colunas = [];
            const valores = [];
            camposPermitidos.forEach((campo) => {
                if (cliente[campo] !== undefined) {
                    colunas.push(`${campo} = ?`);
                    valores.push(cliente[campo]);
                }
            });

            if (colunas.length === 0) {
                return res.status(400).json({ resposta: "Nenhum campo válido enviado" });
            };

            const [resultado] = await db.pool.query(
                `UPDATE cliente SET ${colunas.join(', ')} WHERE REGEXP_REPLACE(cpf, '[^0-9]', '') = ?`,
                [...valores, cpf_param_digits]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ erro: 'Cliente não existe no banco de dados' });
            };
            res.status(200).json({ resposta: "Cliente atualizado com sucesso!" });
        } catch (error) {
            res.status(500).json({ resposta: error.message });
        };
    }
});

app.listen(port, () => {
    console.log('API executando na porta', port);
});