const express = require('express');
const router = express.Router();
const Teams = require('../../models/Teams');

router.post('/', async (req, res) => {
  try {
    const { name, birth, image, history } = req.body;
    const newTeams = new Teams({ name, birth, image, history });
    await newTeams.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar time' });
  }
});

module.exports = router;