// npm init
// npm i express
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

// npm i mysql2
// npm i bcrypt
const db = require("./db");
const bcrypt = require("bcrypt");

app.get("/ola", (req, res) => {
  res.send("Hello World!");
});

app.post("/cliente", async (req, res) => {
  try {
    const cliente = req.body;
    const senhaCript = bcrypt.hashSync(cliente.senha, 10);
    cliente.senha = senhaCript;

    // envio para o BD
    const resultado = await db.pool.query(
      `INSERT INTO Cliente (
                idConcessionária, nome, cpf, email, celular, senha
            ) VALUES ( ?, ?, ?, ?, ?, ? )`,
      [
        cliente.idConcessionária,
        cliente.nome,
        cliente.cpf,
        cliente.email,
        cliente.celular,
        cliente.senha,
      ],
    );
    res.status(201).json({
      mensagem: "Cliente cadastrado com sucesso! id = " + resultado[0].insertId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/clientes", async (req, res) => {
  try {
    const resultado = await db.pool.query(`SELECT * FROM Cliente;`);
    res.status(201).json({ resultado });
  } catch (error) {
    res.status(500).json({ resposta: error.message });
  }
});

app.get("/clientes/:cpf", async (req, res) => {
  const cpf_param = req.params["cpf"];
  try {
    const resultado = await db.pool.query(
      `SELECT * FROM Cliente WHERE cpf = ?;`,
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

app.delete("/clientes/:cpf", async (req, res) => {
  const cpf_param = req.params["cpf"];
  try {
    const resultado = await db.pool.query(
      `DELETE FROM Cliente WHERE cpf = ?;`,
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
      `UPDATE Cliente SET nome = ?, cpf = ?, email = ?, celular = ?, senha = ? WHERE cpf = ?`,
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

app.post("/login", async (req, res) => {
  try {
    const dadosLogin = req.body;
    
    // envio para o BD
    const resultado = await db.pool.query(
      `SELECT email, senha FROM Cliente WHERE email = ? AND senha = ?`,
      [
        dadosLogin.email,
        dadosLogin.senha,
      ],
    );
    const dados_bd = resultado[0][0];
    if (!dados_bd) {
      return res.status(401).json({ mensagem: "Email ou senha incorretos" });
    }
    const senhaCript = bcrypt.hashSync(dadosLogin.senha, 10);
    if(!dadosLogin.senha === senhaCript) {
      return res.status(401).json({ mensagem: "Email ou senha incorretos" });
    }
    res.status(201).json({
      mensagem: "Login realizado com sucesso!",
      dados: dados_bd
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log("API executando na porta", port);
});
