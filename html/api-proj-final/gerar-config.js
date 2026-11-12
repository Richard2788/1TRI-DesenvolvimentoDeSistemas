// Gera o arquivo site/config.js com a porta da API lida do .env
// Roda automaticamente pelo "npm start", junto do migration.js
const fs = require('fs');
const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, '.env')
});

const porta = process.env.API_PORT || '3000';
const conteudo = `// Gerado automaticamente por gerar-config.js a partir do .env\nwindow.link_api = "http://localhost:${porta}";\n`;

const caminho = path.join(__dirname, 'site', 'config.js');
fs.writeFileSync(caminho, conteudo, 'utf8');
console.log(`site/config.js atualizado com a porta ${porta}.`);