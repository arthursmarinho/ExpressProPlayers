const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const players = [
       {name:"Leonardo", image:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTKjkxoQ9bYCemjt7HCuZ9qKPGbeoehly7P0nC_ASWbzHhjP-kY9CqSgcNFcNHr32yvG5zF79jz6V9XHTodcnkUJw", game:"CS:GO"},
       {name:"Leonardo", image:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTKjkxoQ9bYCemjt7HCuZ9qKPGbeoehly7P0nC_ASWbzHhjP-kY9CqSgcNFcNHr32yvG5zF79jz6V9XHTodcnkUJw", game:"CS:GO"},
       {name:"Leonardo", image:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTKjkxoQ9bYCemjt7HCuZ9qKPGbeoehly7P0nC_ASWbzHhjP-kY9CqSgcNFcNHr32yvG5zF79jz6V9XHTodcnkUJw", game:"CS:GO"},
    ];

    res.render("proplayers", { players });
});

module.exports = router;
