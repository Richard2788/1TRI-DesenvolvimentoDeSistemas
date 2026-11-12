// npm init
// npm i dotenv
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env')
});
// npm i express
const express = require("express")
const app = express()
const port = process.env.API_PORT
app.use(express.json())

// npm i mysql2
const db = require("./db")

// npm i bcrypt
const bcrypt = require("bcrypt")

// npm i jsonwebtoken
const jwt = require("jsonwebtoken")

// npm i cors
const cors = require("cors")
app.use(cors())

// serve o site na mesma porta da API (http://localhost:<API_PORT>/)
app.use(express.static(path.join(__dirname, "site")))

// as fotos locais ficam em assets/img (ex.: assets/img/ty_preto_xle/1.jpg)
// path.join(__dirname, "img") apontava para uma pasta que não existe
app.use("/img", express.static(path.join(__dirname, "assets", "img")))

const { use } = require('react');


app.post("/cliente", async (req, res) => {
  try {
    const cliente = req.body
    const senhaCript = await bcrypt.hash(cliente.senha, 10)
    cliente.senha = senhaCript

    // envio para o BD
    const resultado = await db.pool.query(
      `INSERT INTO cliente (
                idConcessionária, nome, cpf, celular, email, senha
            ) VALUES (?, ?, ?, ?, ?, ? )`,
      [1, cliente.nome, cliente.cpf, cliente.celular,
        cliente.email, cliente.senha]
    )
    res.status(201).json({ msg: "Cliente cadastrado com sucesso!" })
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

app.post("/login", async (req, res) => {
  try {
    const user = req.body
    const resultado = await db.pool.query(
      "SELECT id, nome, email, senha FROM cliente WHERE email = ?", [user.email]
    )
    const dados_bd = resultado[0][0]
    if (!dados_bd) {
      return res.status(401).json({ msg: "Email não cadastrado!" })
    }

    const senha_valida = await bcrypt.compare(user.senha, dados_bd.senha)

    if (!senha_valida) {
      return res.status(401).json({ msg: "Credenciais inválidas!" })
    }

    const payload = {
      id: dados_bd.id,
      email: dados_bd.email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1m' })
    return res.status(200).json({ nome: dados_bd.nome, token: token })

  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

app.post('comprar', autenticar, async (req, res) => {
  try {
    //token do cliente logado
    const idCliente = req.usuario.id;
    const { idCarro } = req.body;

    // forma de pagamento
    const { formaPagamento } = req.body;

    // puxa a data do servidor para salvar no bd
    const dataCompra = new Date();
    
    // lista de produtos (id e quantidade de cada produto) - no caso, apenas 1 carro
    const produtos = [{ id: idCarro, quantidade: 1 }];
    
    // buscar por cada produto no bd
    for (const produto of produtos) {
      const resultado = await db.pool.query(
        `SELECT * FROM carro WHERE id = ?;`,
        [produto.id]
      );
      const carro = resultado[0][0];
      if (!carro) {
        return res.status(404).json({ erro: `Carro com ID ${produto.id} não encontrado.` });
      }
    }

    // pegar o valor de cada produto, multiplicar pela quantidade e somar ao total da compra
    let totalCompra = 0;
    for (const produto of produtos) {
      const resultado = await db.pool.query(
        `SELECT preco FROM carro WHERE id = ?;`,
        [produto.id]
      );
      const carro = resultado[0][0];
      totalCompra += carro.preco * produto.quantidade;
    }

    // reduzir a quantidade de cada produto no estoque do banco de dados
    for (const produto of produtos) {
      await db.pool.query(
        `UPDATE carro SET quantidade = quantidade - ? WHERE id = ?;`,
        [produto.quantidade, produto.id]
      );
    }

    // fazer a soma do valor total da compra e cadastrar a compra no banco de dados
    await db.pool.query(
      `INSERT INTO compra (idCliente, dataCompra, totalCompra, formaPagamento) VALUES (?, ?, ?, ?);`,
      [idCliente, dataCompra, totalCompra, formaPagamento]
    );

    // retornar uma resposta de sucesso para o cliente
    res.status(200).json({ msg: 'Compra realizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.get("/clientes", async (req, res) => {
  try {
    const resultado = await db.pool.query(`SELECT * FROM cliente;`);
    res.status(201).json({ resultado });
  } catch (error) {
    res.status(500).json({ resposta: error.message });
  }
});

app.get("/carros", async (req, res) => {
  try {
    // quantidade fixa de carros por página
    const LIMITE_POR_PAGINA = 10;
    let sql = "SELECT * FROM carro WHERE 1=1"
    const params = []
    // Query Parameters
    const { busca, categoria, ordenacao, preco_min, preco_max, pagina } = req.query
    let resultado
    if (busca) {
      sql += " AND CONCAT(marca, ' ', versao) LIKE ?"
      params.push(`%${busca}%`)
    }
    if (categoria) {
      sql += " AND marca = ?"
      params.push(categoria)
    }
    if (preco_min) {
      sql += " AND preco >= ?"
      params.push(Number(preco_min))
    }
    if (preco_max) {
      sql += " AND preco <= ?"
      params.push(Number(preco_max))
    }
    if (ordenacao == "menor preco") {
      sql += " ORDER BY preco ASC"
    } else if (ordenacao == "maior preco") {
      sql += " ORDER BY preco DESC"
    }

    // tradução dos filtros para o COUNT da página
    let where = "WHERE 1=1";
    const valoresWhere = [];
    if (busca) { where += " AND CONCAT(marca, ' ', versao) LIKE ?"; valoresWhere.push(`%${busca}%`); }
    if (categoria) { where += " AND marca = ?"; valoresWhere.push(categoria); }
    if (preco_min) { where += " AND preco >= ?"; valoresWhere.push(Number(preco_min)); }
    if (preco_max) { where += " AND preco <= ?"; valoresWhere.push(Number(preco_max)); }

    // total de carros que batem com os filtros (para calcular a quantidade de páginas)
    const [totalResult] = await db.pool.query(
      `SELECT COUNT(*) AS total FROM carro ${where}`,
      valoresWhere
    )
    const total = totalResult[0].total
    let totalPaginas = Math.max(1, Math.ceil(total / LIMITE_POR_PAGINA))

    // paginação: pagina=1 -> 10 primeiros, pagina=2 -> do 11º ao 20º, etc
    let numeroPagina = parseInt(pagina, 10)
    if (isNaN(numeroPagina) || numeroPagina < 1 || numeroPagina > totalPaginas) {
      numeroPagina = 1
    }
    const offset = (numeroPagina - 1) * LIMITE_POR_PAGINA

    sql += " LIMIT ? OFFSET ?"
    params.push(LIMITE_POR_PAGINA, offset)
    resultado = await db.pool.query(sql, params)
    // Formata o array adicionando a imagem padrão caso não exista
    const carros = resultado[0].map(carro => ({
      ...carro,
      preco: Number(carro.preco).toFixed(2),
      nome: `${carro.marca} ${carro.versao}`,
      descricao: `${carro.cor} • motor ${Number(carro.motor).toFixed(1)} L • ${carro.versao}`,
      imagem: carro.imagem
    }));

    // Retorna status 200 (OK) com a lista de carros + dados de paginação
    return res.status(200).json({
      carros: carros,
      total: total,
      pagina: numeroPagina,
      totalPaginas: totalPaginas,
      limite: LIMITE_POR_PAGINA
    });
  } catch (error) {
    // Exibe o erro exato no terminal do Node.js para diagnóstico
    console.error("Erro na rota GET /carros:", error);
    res.status(500).json({ erro: error.message });
  }
});

app.get("/clientes/perfil", autenticar, async (req, res) => {
  const id = req.usuario.id;
  try {
    const resultado = await db.pool.query(
      `SELECT * FROM cliente WHERE id = ?;`,
      [id],
    );
    const perfil = resultado[0][0];
    delete perfil.senha; // Remover a senha do perfil antes de enviar a resposta
    res.status(200).json(perfil);
  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});


app.delete("/clientes/:cpf", async (req, res) => {
  const cpf_param = req.params["cpf"];
  try {
    const resultado = await db.pool.query(
      `DELETE FROM cliente WHERE cpf = ?;`,
      [cpf_param],
    );
    if (!resultado[0] || resultado[0].length === 0) {
      res.status(404).json({ erro: "Cliente não existe no banco de dados" });
    }
    res.status(200).json(resultado[0]);
  } catch (error) {
    res.status(500).json({ resposta: error.message });
  }
});

app.put("/clientes/:cpf", async (req, res) => {
  const cliente = req.body;
  const cpf_param = req.params["cpf"];
  try {
    const resultado = await db.pool.query(
      `UPDATE cliente SET nome = ?, cpf = ?, email = ?, celular = ?, senha = ? WHERE cpf = ?`,
      [
        cliente.nome,
        cliente.cpf,
        cliente.email,
        cliente.celular,
        cliente.senha,
        cpf_param,
      ],
    );
    if (!resultado[0] || resultado[0].length === 0) {
      res.status(404).json({ erro: "Cliente não existe no banco de dados" });
    }
    res.status(200).json(resultado[0]);
  } catch (error) {
    res.status(500).json({ resposta: error.message });
  }
});

function autenticar(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ erro: "Token não fornecido, usar Authorization Bearer <token>" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ erro: "Token inválido" });
    }
    req.usuario = usuario;
    next();
  });
}

app.listen(port, () => {
  console.log("API executando na porta", port);
});