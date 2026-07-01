/* 
Instale as bibliotecas e o cliente de API:
npm init
npm i express
Procure pela extensão RapidAPI Client no VSCode.
*/
// Para executar a API no terminal: node index.js
// Link para testar a API: http://localhost:3000/rota
const express = require("express")
const app = express()
const port = 3000
app.use(express.json()) // configura API para usar JSON.
const fs = require('fs') // importa leitura e escrita de arquivos.

app.get('/filmes', (req, res) => {
    const filmes = JSON.parse(fs.readFileSync('filmes.json', 'utf-8'))
    res.status(200).json(filmes)
})

app.get('/filmes/:id', (req, res) => {
    const id = req.params.id
    try {
        const filmes = JSON.parse(fs.readFileSync('filmes.json', 'utf-8'))
        const filme_id = filmes.findIndex((filme) => (String(filme.id) === (id)))
        if (filme_id === -1) {
            return res.status(404).json({ erro: 'Filme não encontrado' })
        }
        const filme_encontrado = filmes[filme_id]
        res.status(200).json(filme_encontrado)
    } catch (error) {
        res.status(404).json({ erro: error })
    }
})

app.post('/filmes', (req, res) => {
    const novo_filme = req.body
    try {
        const bd = JSON.parse(fs.readFileSync('filmes.json', 'utf-8'))
        bd.push(novo_filme)
        fs.writeFileSync('filmes.json', JSON.stringify(bd), 'utf-8')
        res.status(200).json({ mensagem: 'Filme cadastrado com sucesso!' })
    } catch (error) {
        res.status(404).json({ erro: error })
    }
})

/*
    Exemplo de body do POST:
    {
        "id": 11,
        "titulo": "Dragon Ball Z",
        "ano": 1992,
        "genero": "Animação",
        "diretor": "Akira Tomiyama",
        "imdb": 9.1
    }
*/

app.delete('/filmes/:id', (req, res) => {
    const id = req.params.id
    try {
        const bd = JSON.parse(fs.readFileSync('filmes.json', 'utf-8'))
        const filme_id = bd.findIndex((filme) => (String(filme.id) === (id)))
        if (filme_id === -1) {
            return res.status(404).json({ erro: 'Filme não encontrado' })
        }
        bd.splice(filme_id, 1)
        fs.writeFileSync('filmes.json', JSON.stringify(bd), 'utf-8')
        res.status(200).json({ mensagem: 'Filme removido com sucesso!' })
    } catch (error) {
        res.status(404).json({ erro: error })
    }
})

app.get('/filmes/genero/:genero', (req, res) => {
    const genero = req.params.genero
    try {
        const filmes = JSON.parse(fs.readFileSync('filmes.json', 'utf-8'))
        const filmes_genero = filmes.filter((filme) => ((filme.genero) === (genero)))
        if (filmes_genero.length === 0) {
            return res.status(404).json({ erro: 'Não existem filmes desse gênero' })
        }
        res.status(200).json(filmes_genero)
    } catch (error) {
        res.status(404).json({ erro: error })
    }
})


// Execução da API:
app.listen(port, () => {
    console.log("API rodando na porta " + port)
})
