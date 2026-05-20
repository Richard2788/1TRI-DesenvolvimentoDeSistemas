const express = require('express')
const app = express()
const port = 3001

app.get('/ola', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log('API executando na porta', port)
})