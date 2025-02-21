const express = require("express");
const router = express.Router();
const Teams = require('../models/Teams');

router.get("/", async (req, res) => {
    try {
        const teams = await Teams.find();
        res.render("teams", { teams });
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar times, a net deve ter caído" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const team = await Teams.findById(req.params.id);
        if (!team) {
            return res.status(404).json({ error: "Time não encontrado" });
        }
        res.render("aboutteam", { team });
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar time" });
    }
});


module.exports = router;    