const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const fs = require('fs')

app.get('/musicas', (req, res) => {
    const musicas = JSON.parse(fs.readFileSync('bd.json', 'utf-8'))
});

app.listen(port, () => {
    console.log('APP executando na porta', port)
})