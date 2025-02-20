const express = require("express");
const router = express.Router();
const ProPlayer = require("../models/ProPlayer");

// Rota GET para listar todos os jogadores e renderizar a página proplayers
router.get("/", async (req, res) => {
    try {
        const players = await ProPlayer.find();
        res.render("proplayers", { players });
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar jogadores" });
    }
});

// Rota POST para adicionar um novo jogador
router.post("/", async (req, res) => {
  try {
      console.log("Dados recebidos no POST:", req.body); // Depuração
      
      const { name, age, image, team, history, sensi } = req.body;

      if (!name || !age || !image || !team || !history || !sensi) {
          return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
      }

      const newPlayer = new ProPlayer({ name, age, image, team, history, sensi });

      await newPlayer.save();
      res.status(201).json(newPlayer);
  } catch (err) {
      console.error("Erro ao criar jogador:", err);
      res.status(500).json({ error: "Erro ao criar jogador" });
  }
});

// Rota GET para detalhes de um jogador específico
router.get("/:id", async (req, res) => {
    try {
        const player = await ProPlayer.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ error: "Jogador não encontrado" });
        }
        res.render("aboutplayer", { player });
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar jogador" });
    }
});

// Rota DELETE para deletar um jogador
router.delete("/:id", async (req, res) => {
    try {
        const deletedPlayer = await ProPlayer.findByIdAndDelete(req.params.id);
        if (!deletedPlayer) {
            return res.status(404).json({ error: "Jogador não encontrado" });
        }
        res.status(200).json({ message: "Jogador deletado com sucesso" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao deletar jogador" });
    }
});

// Rota PUT para atualizar um jogador (correta)
router.put("/:id", async (req, res) => {
    try {
        console.log("Dados recebidos no PUT:", req.body); // Debugging

        const updatedPlayer = await ProPlayer.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Atualiza apenas os campos fornecidos
            { new: true, runValidators: true } // Retorna o jogador atualizado e valida os dados
        );

        if (!updatedPlayer) {
            return res.status(404).json({ error: "Jogador não encontrado" });
        }

        res.json(updatedPlayer);
    } catch (err) {
        console.error("Erro ao atualizar jogador:", err);
        res.status(500).json({ error: "Erro ao atualizar jogador" });
    }
});

module.exports = router;
