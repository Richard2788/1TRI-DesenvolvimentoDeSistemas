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
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.status(200).json({ nome: dados_bd.nome, token: token })

  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

// Finaliza o carrinho enviado pelo navegador. Os preços são sempre lidos do banco.
app.post("/compras", autenticar, async (req, res) => {
  const { itens, formaPagamento } = req.body || {};
  if (!Array.isArray(itens) || itens.length === 0 || itens.length > 25) {
    return res.status(400).json({ erro: "Informe entre 1 e 25 veículos no carrinho." });
  }
  if (!formaPagamento || typeof formaPagamento !== "string" || formaPagamento.length > 40) {
    return res.status(400).json({ erro: "Informe uma forma de pagamento válida." });
  }

  if (itens.some(item => !item || typeof item !== "object")) {
    return res.status(400).json({ erro: "O carrinho contém um item inválido." });
  }
  const formasPermitidas = ["PIX", "Cartão de crédito", "Financiamento", "À vista"];
  if (!formasPermitidas.includes(formaPagamento)) {
    return res.status(400).json({ erro: "Forma de pagamento não permitida." });
  }
  const ids = itens.map(item => Number(item.idCarro));
  if (ids.some(id => !Number.isSafeInteger(id) || id <= 0) || new Set(ids).size !== ids.length) {
    return res.status(400).json({ erro: "O carrinho contém IDs inválidos ou repetidos." });
  }

  let connection;
  try {
    connection = await db.pool.getConnection();
    await connection.beginTransaction();

    // FOR UPDATE impede que dois clientes comprem o mesmo veículo simultaneamente.
    const [carros] = await connection.query(
      "SELECT id, marca, versao, preco, idCompra FROM carro WHERE id IN (?) FOR UPDATE",
      [ids]
    );
    if (carros.length !== ids.length) {
      await connection.rollback();
      return res.status(404).json({ erro: "Um ou mais veículos não foram encontrados." });
    }
    const indisponiveis = carros.filter(carro => carro.idCompra !== null);
    if (indisponiveis.length) {
      await connection.rollback();
      return res.status(409).json({ erro: "Um ou mais veículos já foram vendidos. Atualize seu carrinho." });
    }

    const totalCompra = carros.reduce((total, carro) => total + Number(carro.preco), 0);
    const [compra] = await connection.query(
      "INSERT INTO compra (idCliente, dataCompra, totalCompra, formaPagamento) VALUES (?, NOW(), ?, ?)",
      [req.usuario.id, totalCompra.toFixed(2), formaPagamento]
    );
    const valoresItens = carros.map(carro => [compra.insertId, carro.id, carro.preco]);
    await connection.query(
      "INSERT INTO compra_item (idCompra, idCarro, precoUnitario) VALUES ?",
      [valoresItens]
    );
    await connection.query(
      "UPDATE carro SET idCompra = ? WHERE id IN (?) AND idCompra IS NULL",
      [compra.insertId, ids]
    );

    await connection.commit();
    return res.status(201).json({
      msg: "Compra realizada com sucesso!",
      idCompra: compra.insertId,
      totalCompra: totalCompra.toFixed(2)
    });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Erro ao finalizar compra:", error);
    return res.status(500).json({ erro: "Não foi possível finalizar a compra." });
  } finally {
    if (connection) connection.release();
  }
});

// Retorna somente as compras pertencentes ao usuário autenticado.
app.get("/compras", autenticar, async (req, res) => {
  try {
    const [linhas] = await db.pool.query(
      `SELECT c.id AS idCompra, c.dataCompra, c.totalCompra, c.formaPagamento,
              ci.idCarro, ci.precoUnitario, ca.marca, ca.versao, ca.cor, ca.placa, ca.imagem
         FROM compra c
         LEFT JOIN compra_item ci ON ci.idCompra = c.id
         LEFT JOIN carro ca ON ca.id = ci.idCarro
        WHERE c.idCliente = ?
        ORDER BY c.dataCompra DESC, c.id DESC`,
      [req.usuario.id]
    );
    const compras = [];
    const porId = new Map();
    for (const linha of linhas) {
      let compra = porId.get(linha.idCompra);
      if (!compra) {
        compra = {
          id: linha.idCompra,
          dataCompra: linha.dataCompra,
          totalCompra: Number(linha.totalCompra),
          formaPagamento: linha.formaPagamento,
          itens: []
        };
        porId.set(linha.idCompra, compra);
        compras.push(compra);
      }
      if (linha.idCarro !== null) {
        compra.itens.push({
          idCarro: linha.idCarro,
          marca: linha.marca,
          versao: linha.versao,
          cor: linha.cor,
          placa: linha.placa,
          imagem: linha.imagem,
          precoUnitario: Number(linha.precoUnitario)
        });
      }
    }
    return res.status(200).json({ compras });
  } catch (error) {
    console.error("Erro ao consultar compras:", error);
    return res.status(500).json({ erro: "Não foi possível consultar suas compras." });
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
    let sql = "SELECT * FROM carro WHERE idCompra IS NULL"
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
    let where = "WHERE idCompra IS NULL";
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