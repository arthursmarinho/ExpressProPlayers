const express = require("express");
const router = express.Router();
const ProPlayer = require("../models/ProPlayer");

// Rota GET para listar todos os jogadores e renderizar a página proplayers
router.get("/", async (req, res) => {
    try {
        const players = await ProPlayer.find();
        res.render("proplayers", { players });
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar jogadores, a net deve ter caído" });
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



module.exports = router;
