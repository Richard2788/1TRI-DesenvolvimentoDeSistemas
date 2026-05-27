// npm init
// npm i express

const express = require('express')
const fs = require('fs')
const app = express()
app.use(express.json())
const port = 3001

app.get('/ola', (req, res) => {
    res.send('Hello World!')
})

app.post('/clientes/cadastro', (req, res) => {
    // pegar os dados que vem do usuário
    // salvar no bd.json
    // resposta se tudo deu certo
    const cliente = req.body
    if (!cliente || Object.keys(cliente).length === 0) {
        res.status(400).json({resposta: "Body não preenchido"})
    } else {
        try {
            const bd = JSON.parse(fs.readFileSync('bd.json', 'utf8'))
            bd.push(cliente)
            fs.writeFileSync('bd.json', JSON.stringify(bd), 'utf8')
            res.status(200).json({resposta: "Cliente cadastrado com sucesso!"})
        } catch(error) {
            res.status(500).json({resposta: error.message})
        }
    }    
})

app.listen(port, () => {
    console.log('API executando na porta', port)
})