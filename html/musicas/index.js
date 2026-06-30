/*  
    GET/musicas
    GET /musicas/:id
    POST /musicas
    DELETE /musicas/:id
    GET /musicas/estilo/:estilo 
*/

const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const fs = require('fs')

app.get('/musicas', (req, res) => {
    const musicas = JSON.parse(fs.readFileSync('bd.json', 'utf8'))
    res.status(201).json(musicas)
});

app.get('/musicas/:id', (req, res) => {
    const id_param = req.params['id']
    console.log(id_param)
    try {
        const musicas = JSON.parse(fs.readFileSync('bd.json', 'utf-8'))
        const id_encontrado = musicas.find((musica) => {
            return (String(musica.id)) === (id_param)
        })
        console.log(id_encontrado)
        if (!id_encontrado) {
            res.status(404).json({ erro: 'Música não encontrada' })
        }
        res.status(200).json(id_encontrado)
    } catch (error) {
        res.status(500).json({ resposta: error.message })
    }
})

app.post('/musicas', (req, res) => {
    const musica = req.body
    if (!musica || Object.keys(musica).length === 0) {
        res.status(400).json({ resposta: "Body não preenchido" });
    } else {
        try {
            const bd = JSON.parse(fs.readFileSync('bd.json', 'utf-8'))
            bd.push(musica)
            fs.writeFileSync('bd.json', JSON.stringify(bd), 'utf-8')
            res.status(201).json({ resposta: 'Música cadastrada com sucesso!' })
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }
})

app.delete('/musicas/:id', (req, res) => {
    const id_param = req.params['id']
    console.log(id_param)
    try {
        const musicas = JSON.parse(fs.readFileSync('bd.json', 'utf-8'))
        const id_encontrado = musicas.findIndex((musica) => {
            return (String(musica.id)) === (id_param)
        })
        console.log(id_encontrado)
        if (id_encontrado === -1) {
            return res.status(404).json({ erro: 'Música não existe no banco de dados' })
        }
        musicas.splice(id_encontrado, 1)
        res.status(200).json(musicas)
        fs.writeFileSync('bd.json', JSON.stringify(musicas), 'utf-8')
    } catch (error) {
        res.status(500).json({ resposta: error.message })
    }
})

app.get('/musicas/estilo/:estilo', (req, res) => {
    const estilo_param = req.params['estilo']
    try {
        const musicas = JSON.parse(fs.readFileSync('bd.json', 'utf-8'))
        const estilo_escontrado = musicas.filter((musica) => {
            return (musica.estilo) === (estilo_param)
        })
        console.log(estilo_escontrado)
        if (estilo_escontrado.length === 0) {
            return res.status(404).json({ erro: 'Estilo não encontrado' })
        }
        res.status(200).json(estilo_escontrado)
    } catch (error) {
        res.status(500).json({ resposta: error.message })
    }
})

app.listen(port, () => {
    console.log('APP executando na porta', port)
});
