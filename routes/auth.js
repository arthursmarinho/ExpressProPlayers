const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Tela de registro
router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});


// Processar registro
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Nome de usuário e senha são obrigatórios!");
  }

  try {
    // Verificar se o usuário já existe
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).send("Usuário já existe!");
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).send("Usuário cadastrado com sucesso!"); // Sucesso com status 201
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao registrar usuário: " + err.message);
  }
});


// Tela de login
router.get("/login", (req, res) => {
  res.render("login");
});
// Processar login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Nome de usuário e senha são obrigatórios!");
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("Usuário não encontrado!");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Senha incorreta!");
    }

    // Criar token JWT
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Armazenar usuário na sessão
    req.session.user = { id: user._id, username: user.username };

    // Redirecionar para a home
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao fazer login: " + err.message);
  }
});


module.exports = router;
