const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Erro ao deslogar.");
    }
    res.redirect("/"); // Redireciona para a home após logout
  });
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Nome de usuário e senha são obrigatórios!");
  }

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).send("Usuário já existe!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao registrar usuário: " + err.message);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

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

    // Salva o usuário na sessão para permitir o login
    req.session.userId = user._id; // Armazenando o ID do usuário na sessão

    res.redirect("/"); // Redireciona para a página inicial após o login
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao fazer login: " + err.message);
  }
});

module.exports = router;
