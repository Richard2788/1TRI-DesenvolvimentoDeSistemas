// npm init
// npm i express

const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());
const fs = require('fs');

app.get('/ola', (req, res) => {
    res.send('Hello World!');
});

app.post('/clientes', (req, res) => {
    // pegar os dados que vem do usuário
    // salvar no bd.json
    // resposta se tudo deu certo
    const cliente = req.body;
    if (!cliente || Object.keys(cliente).length === 0) {
        res.status(400).json({ resposta: "Body não preenchido" });
    } else {
        try {
            const bd = JSON.parse(fs.readFileSync('bd.json', 'utf8'));
            bd.push(cliente);
            fs.writeFileSync('bd.json', JSON.stringify(bd), 'utf8');
            res.status(201).json({ resposta: "Cliente cadastrado com sucesso!" });
        } catch (error) {
            res.status(500).json({ resposta: error.message });
        };
    };
});

app.get('/clientes', (req, res) => {
    try {
        const clientes = JSON.parse(fs.readFileSync('bd.json', 'utf8'));
        res.status(200).json(clientes);
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

app.listen(port, () => {
    console.log('API executando na porta', port);
});