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

app.listen(port, () => {
    console.log('API rodando na porta', port)
})
