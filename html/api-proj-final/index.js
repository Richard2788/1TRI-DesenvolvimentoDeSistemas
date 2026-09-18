// npm init
// npm i express
const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

// npm i mysql2
const db = require("./db")

// npm i bcrypt
const bcrypt = require("bcrypt")

// npm i jsonwebtoken
const jwt = require("jsonwebtoken")

// npm i dotenv
const dotenv = require("dotenv")
dotenv.config()

// npm i cors
const cors = require("cors")
app.use(cors())


app.post("/cliente", async (req, res) => {
  try {
    const cliente = req.body
    const senhaCript = bcrypt.hashSync(cliente.senha, 10)
    cliente.senha = senhaCript

    // envio para o BD
    const resultado = await db.pool.query(
      `INSERT INTO cliente (
                idConcessionária, nome, cpf, celular, email, senha
            ) VALUES (?, ?, ?, ?, ?, ? )`,
      [1, cliente.nome, cliente.cpf, cliente.celular,
      cliente.email, cliente.senha]
    )
    res.status(201).json({
      msg: "Cliente cadastrado, ID = " + resultado[0].insertId
    })
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

app.get("/clientes", async (req, res) => {
  try {
    const resultado = await db.pool.query(`SELECT * FROM cliente;`);
    res.status(201).json({ resultado });
  } catch (error) {
    res.status(500).json({ resposta: error.message });
  }
});

app.get("/clientes/:cpf", async (req, res) => {
  const cpf_param = req.params["cpf"];
  try {
    const resultado = await db.pool.query(
      `SELECT * FROM cliente WHERE cpf = ?;`,
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

app.get("/clientes/:id", async (req, res) => {
  const id_param = req.params["id"];
  try {
    const resultado = await db.pool.query(
      `SELECT * FROM cliente WHERE id = ?;`,
      [id_param],
    );
    if (!resultado[0] || resultado[0].length === 0) {
      res.status(404).json({ erro: "Cliente não existe no banco de dados" });
    }
    res.status(200).json(resultado[0]);
  } catch (error) {
    res.status(500).json({ resposta: error.message });
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
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido" });
  }
}

app.listen(port, () => {
  console.log("API executando na porta", port);
});
