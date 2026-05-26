// npm init
// npm i express

const express = require('express')
const fs = require('fs')
const app = express()
const port = 3001

app.get('/ola', (req, res) => {
    res.send('Hello World!')
})

app.post('/clientes/cadastro', (req, res) => {
    // pegar os dados que vem do usuário
    // salvar no bd.json
    // resposta se tudo deu certo
    const dados = req.body
    const bd = fs.readFileSync('jogos.json', 'utf8')
    const bdOBJ = JSON.parse(bd)
    bdOBJ.push(dados)
    fs.writeFileSync('jogos.json', JSON.stringify(bdOBJ), 'utf8')
    console.log(bdOBJ)
    res.json({resposta: 'ok'})
})

app.listen(port, () => {
    console.log('API executando na porta', port)
})