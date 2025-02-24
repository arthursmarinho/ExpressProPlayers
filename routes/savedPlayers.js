// Supondo que você tenha uma rota como esta para salvar jogadores
const express = require("express");
const router = express.Router();
const ProPlayer = require("../models/ProPlayer"); // Seu modelo de jogador
const User = require("../models/User"); // Supondo que você tenha um modelo de usuário para autenticação

// Rota para salvar jogador
router.post("/savedPlayer/save", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Você precisa estar logado para salvar um jogador." });
  }

  // Salvando o jogador na lista do usuário
  const { playerName, game, team } = req.body;

  // Criar o objeto de jogador para salvar
  const savedPlayer = new SavedPlayer({
    userId: req.session.userId, // Associando o jogador ao usuário
    playerName,
    game,
    team
  });

  savedPlayer.save()
    .then(() => res.json({ message: "Jogador salvo com sucesso!" }))
    .catch(error => res.status(500).json({ message: "Erro ao salvar jogador.", error }));
});

// Rota para visualizar os jogadores salvos
router.get("/savedPlayers", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login"); // Se não estiver logado, redireciona para login
  }

  SavedPlayer.find({ userId: req.session.userId })
    .then(players => res.render("savedPlayers", { players }))
    .catch(error => res.status(500).json({ message: "Erro ao carregar jogadores salvos.", error }));
});

module.exports = router;
