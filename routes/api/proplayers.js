const express = require('express');
const router = express.Router();
const ProPlayer = require('../../models/ProPlayer');

router.post('/', async (req, res) => {
  try {
    const { name, age, image, team} = req.body;
    const newPlayer = new ProPlayer({ name, age, image, team });
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar jogador' });
  }
});

module.exports = router;
