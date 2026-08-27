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

app.post('/cliente', async (req, res) => {
    try {
        const cliente = req.body
        const senhaCript = bcrypt.hashSync(cliente.senha, 10)
        cliente.senha = senhaCript

        // envio para o BD
        const resultado = await db.pool.query(
            `INSERT INTO cliente (
                nome, cpf, email, celular, senha
            ) VALUES ( ?, ?, ?, ?, ? )`,
            [cliente.nome, cliente.cpf, cliente.email, cliente.celular, cliente.senha]

        )
        res.status(201).json({mensagem: 'Cliente cadastrado com sucesso! id = ' + resultado[0].insertId})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get('/clientes', (req, res) => {
    try {
        const resultado = db.pool.query(
            `SELECT * FROM cliente;`,
        )
        res.status(201).json({resultado})
    } catch (error) {
        res.status(500).json({ resposta: error.message });
    };
});

app.get('/clientes/:cpf', (req, res) => {
    const cpf_param = req.params['cpf'];
    try {
        const clientes = JSON.parse(fs.readFileSync('bd.json', 'utf8'));
        const usuario_encontrado = clientes.find((cliente) => {
            return (cliente.cpf.replace(/\D/g, '')) === (cpf_param)
        });
        if (!usuario_encontrado) {
            res.status(404).json({ erro: 'Cliente não existe no banco de dados' });
        };
        res.status(200).json(usuario_encontrado);
    } catch (error) {
        res.status(500).json({ resposta: error.message });
    };
});

app.delete('/clientes/:cpf', (req, res) => {
    const cpf_param = req.params['cpf'];
    try {
        const clientes = JSON.parse(fs.readFileSync('bd.json', 'utf8'));
        const usuario_encontrado = clientes.findIndex((cliente) => {
            return (cliente.cpf.replace(/\D/g, '')) === (cpf_param)
        });
        console.log(usuario_encontrado)
        if (usuario_encontrado === -1) {
            res.status(404).json({ erro: 'Cliente não existe no banco de dados' });
        };
        clientes.splice(usuario_encontrado, 1);
        res.status(200).json(clientes);

        // atualiza o banco de dados (bd.json)
        fs.writeFileSync('bd.json', JSON.stringify(clientes), 'utf8');
    } catch (error) {
        res.status(500).json({ resposta: error.message });
    };
});

app.put('/clientes/:cpf', (req, res) => {
    const cpf_param = req.params['cpf'];
    const cliente = req.body;
    if (!cliente || Object.keys(cliente).length === 0) {
        return res.status(400).json({ resposta: "Body não preenchido" });
    } else {
        try {
            const clientes = JSON.parse(fs.readFileSync('bd.json', 'utf8'));
            const indice = clientes.findIndex((cliente) => {
                return (cliente.cpf.replace(/\D/g, '')) === (cpf_param)
            });
            console.log(indice)
            if (indice === -1) {
                return res.status(404).json({ erro: 'Cliente não existe no banco de dados' });
            };
            clientes[indice] = cliente
            fs.writeFileSync('bd.json', JSON.stringify(clientes), 'utf8');
            res.status(201).json({ resposta: "Cliente atualizado com sucesso!" });
            console.log(clientes)
        } catch (error) {
            res.status(500).json({ resposta: error.message });
        };
    }
});

app.listen(port, () => {
    console.log('API executando na porta', port);
});