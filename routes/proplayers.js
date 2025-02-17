const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const players = [
       {name:"Pro", image:"https://cdn-icons-png.flaticon.com/512/157/157776.png", game:"CS:GO"},
       {name:"Pro", image:"https://cdn-icons-png.flaticon.com/512/157/157776.png", game:"CS:GO"},
       {name:"Pro", image:"https://cdn-icons-png.flaticon.com/512/157/157776.png", game:"CS:GO"},
    ];

    res.render("proplayers", { players });
});

module.exports = router;
