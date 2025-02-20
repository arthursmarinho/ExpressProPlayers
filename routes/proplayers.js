const express = require("express");
const router = express.Router();
const ProPlayer = require("../models/ProPlayer");

router.get("/", async (req, res) => {
    try {
        const players = await ProPlayer.find();  
        res.render("proplayers", { players }); 
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar jogadores" });
    }
});

router.get("/", async (req, res) => {
    try {
      const players = await ProPlayer.find();
      res.json(players);  
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar jogadores" });
    }
  });
router.delete("/:id", async (req, res) => {
    try {
      const playerId = req.params.id;
      const deletedPlayer = await ProPlayer.findByIdAndDelete(playerId);
      
      if (!deletedPlayer) {
        return res.status(404).json({ error: "Jogador não encontrado" });
      }
      res.status(200).json({ message: "Jogador deletado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: "Erro ao deletar jogador" });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { name, age, image, team } = req.body;
      const updatedPlayer = await ProPlayer.findByIdAndUpdate(
        req.params.id,
        { name, age, image, team },
        { new: true } 
      );
  
      if (!updatedPlayer) {
        return res.status(404).json({ error: "Jogador não encontrado" });
      }
  
      res.json(updatedPlayer); 
    } catch (err) {
      res.status(500).json({ error: "Erro ao atualizar jogador" });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      // Buscando o jogador pelo ID
      const player = await ProPlayer.findById(req.params.id);
  
      if (!player) {
        return res.status(404).json({ error: "Jogador não encontrado" });
      }
  
      // Renderizando a página com as informações do jogador
      res.render("aboutplayer", { player });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar jogador" });
    }
  });
module.exports = router;
