const express = require("express");
const router = express.Router();
const SavedPlayer = require("../models/savedPlayer");

router.post("/save", async (req, res) => {
  // Verifica se o usuário está logado
  if (!req.session.user) {
    return res.status(401).json({ message: "Você precisa estar logado para salvar o jogador." });
  }

  // Logs para depuração
  console.log("Sessão do usuário:", req.session.user);
  console.log("Dados recebidos:", req.body);

  // Validação dos dados recebidos
  const { playerName, game, team, stats } = req.body;

  if (!playerName || !game || !team || !stats) {
    return res.status(400).json({ message: "Dados incompletos. Todos os campos são obrigatórios." });
  }

  try {
    // Criação do novo jogador salvo
    const newSavedPlayer = new SavedPlayer({
      userId: req.session.user._id, // Atribuindo o ID do usuário da sessão
      playerName,
      game,
      team,
      stats
    });

    // Salva o jogador no banco de dados
    await newSavedPlayer.save();
    res.status(200).json({ message: "Jogador salvo com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar jogador:", error);
    res.status(500).json({ message: "Erro ao salvar o jogador." });
  }
});

module.exports = router;
