const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const players = [
        { name: "Dev1ce", image: "https://www.esports.net/br/wp-content/uploads/sites/3/2022/10/dev1ce-astralis-csgo.jpg", game: "CS:GO" },
        { name: "Blackoutz", image: "https://yt3.googleusercontent.com/YjgALcP32v4wzFMkNfrw4sV97Sfs5Fcfha_6Rlixcgai_bOeTOdAWaYkY_0sUhblPn-PvXkp5g=s900-c-k-c0x00ffffff-no-rj", game: "Fortnite" },
        { name: "S1mple", image: "https://img-cdn.hltv.org/gallerypicture/ES9WiNefVAhgEOnnXi_Xjy.jpg?ixlib=java-2.1.0&w=1200&s=1b8b94583eb2781274009e49e832cd53", game: "CS:GO" },
        { name: "Ronaldo", image: "https://instagram.fbfh4-1.fna.fbcdn.net/v/t39.30808-6/467670282_18066611152680342_8626308026598513999_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDEwODAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fbfh4-1.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2AEwXTNqzvhHJ9SZD3kdIoLE5EzIa_OwBv-pBIENiL5wpNFZVztkTGKB4yQ8G547tVgCzwpxvWbgf5cjcqc3tm04&_nc_ohc=F_Bp-zuiGicQ7kNvgGZgokU&_nc_gid=370b7da71de24884b2df1799c49afc91&edm=AP4sbd4AAAAA&ccb=7-5&ig_cache_key=MzQ2NDE3NTcyNTA5NDM2MjEyNw%3D%3D.3-ccb7-5&oh=00_AYDFSUIvzaVTpH09C4PcCV9J8ly4Syecc1Vybo3PFzv_CA&oe=67B514E0&_nc_sid=7a9f4b", game:"Engenheiro Mecanico"}
    ];

    res.render("proplayers", { players });
});

module.exports = router;
